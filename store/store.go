package store

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/eko/gocache/lib/v4/cache"
	"github.com/eko/gocache/lib/v4/store"
	"github.com/shoriwe/tulip/common"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	_ "github.com/eko/gocache/store/redis/v4"
)

type (
	Resolution byte
)

const (
	Minute Resolution = iota
	Hour
	Day
	Month
)

type (
	Source interface {
		Quote(symbol string) (*Candle, error)
		Candles(res Resolution, symbol string, from, to time.Time) ([]*Candle, error)
		RecommendationTrends(symbol string) (*RecommendationTrends, error)
		Peers(symbol string) ([]string, error)
	}
	Store struct {
		db     *gorm.DB
		cache  *cache.Cache[[]byte]
		source Source
	}
)

func NewStore(db *gorm.DB, cache *cache.Cache[[]byte], source Source) *Store {
	db.AutoMigrate(&Candle{}, &Note{})
	return &Store{
		db:     db,
		cache:  cache,
		source: source,
	}
}

var testDBId int = 0

func NewTestStore() *Store {
	s := NewStore(common.NewSQLite(fmt.Sprintf("file:test%d?mode=memory&cache=shared", testDBId)), common.NewBigCache(), NewFinnhub(os.Getenv("FINNHUB")))
	testDBId++
	return s
}

func (s *Store) Close() {
	s.cache.Clear(context.Background())
	sql, err := s.db.DB()
	if err != nil {
		panic(err)
	}
	sql.Close()
}

func (s *Store) Quote(symbol string) (*Candle, error) {
	cacheKey := fmt.Sprintf("quote-%s", symbol)
	// Check the cache
	rawCandle, cacheErr := s.cache.Get(context.Background(), cacheKey)
	if cacheErr == nil {
		candle := &Candle{}
		candle.FromBytes(rawCandle)
		return candle, nil
	}
	// Query
	candle, quoteErr := s.source.Quote(symbol)
	if quoteErr != nil {
		return nil, quoteErr
	}
	s.cache.Set(context.Background(), cacheKey, candle.Bytes(), store.WithExpiration(time.Minute))
	return candle, nil
}

func (s *Store) Candles(res Resolution, symbol string, from, to time.Time) ([]*Candle, error) {
	if from.After(to) {
		return nil, fmt.Errorf("from should be before to")
	}
	var expectedLength int64
	switch res {
	case Minute:
		expectedLength = int64(to.Sub(from).Minutes())
	case Hour:
		expectedLength = int64(to.Sub(from).Hours())
	case Day:
		expectedLength = int64(to.Sub(from).Hours() / 24)
	case Month:
		expectedLength = int64(common.MonthsDiff(from, to))
	default:
		return nil, fmt.Errorf("unknown resolution: %d", res)
	}
	var candles []*Candle
	fErr := s.db.Raw(
		"SELECT symbol, timestamp, resolution, open, high, low, close, prev_close, volume FROM candles WHERE symbol = ? AND resolution = ? AND ? <= timestamp AND timestamp <= ? ORDER BY timestamp ASC",
		symbol, res, from, to,
	).Scan(&candles).Error
	/*
		fErr := s.db.Find(&candles).Where(
			"symbol = ? AND resolution = ? AND ? <= timestamp AND timestamp <= ?",
			symbol, res, from, to,
		).Order("timestamp ASC").Error
	*/
	if fErr != nil {
		return nil, fErr
	}
	if int64(len(candles)) >= expectedLength {
		return candles, nil
	}
	var cErr error
	candles, cErr = s.source.Candles(res, symbol, from, to)
	if cErr != nil {
		return nil, cErr
	}
	iErr := s.db.Clauses(clause.OnConflict{UpdateAll: true}).Create(candles).Error
	if iErr != nil {
		return nil, iErr
	}
	return candles, nil
}

func (s *Store) RecommendationTrends(symbol string) (*RecommendationTrends, error) {
	cacheKey := fmt.Sprintf("recommendation-trend-%s", symbol)
	// Check the cache
	rawTrend, cacheErr := s.cache.Get(context.Background(), cacheKey)
	if cacheErr == nil {
		trend := &RecommendationTrends{}
		trend.FromBytes(rawTrend)
		return trend, nil
	}
	//
	trend, tErr := s.source.RecommendationTrends(symbol)
	if tErr != nil {
		return nil, tErr
	}
	//
	s.cache.Set(context.Background(), cacheKey, trend.Bytes(), store.WithExpiration(24*time.Hour))
	return trend, nil
}

func (s *Store) Peers(symbol string) ([]string, error) {
	cacheKey := fmt.Sprintf("peers-%s", symbol)
	// Check the cache
	rawPeers, cacheErr := s.cache.Get(context.Background(), cacheKey)
	if cacheErr == nil {
		var peers []string
		pErr := json.Unmarshal(rawPeers, &peers)
		return peers, pErr
	}
	//
	peers, pErr := s.source.Peers(symbol)
	if pErr != nil {
		return nil, pErr
	}
	peerBytes, _ := json.Marshal(peers)
	s.cache.Set(context.Background(), cacheKey, peerBytes, store.WithExpiration(24*time.Hour))
	return peers, nil
}
