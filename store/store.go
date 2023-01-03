package store

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/eko/gocache/lib/v4/cache"
	"github.com/eko/gocache/lib/v4/store"
	"github.com/shoriwe/tulip/common"
	"gorm.io/gorm"

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
		Quote(candle *Candle, symbol string) error
		Candles(res Resolution, symbol string, from, to time.Time) (Candles, error)
	}
	Store struct {
		db     *gorm.DB
		cache  *cache.Cache[[]byte]
		source Source
	}
)

func NewStore(db *gorm.DB, cache *cache.Cache[[]byte], source Source) *Store {
	db.AutoMigrate(&Candle{})
	return &Store{
		db:     db,
		cache:  cache,
		source: source,
	}
}

func NewTestStore() *Store {
	return NewStore(common.NewSQLite(":memory:"), common.NewBigCache(), NewFinnhub(os.Getenv("FINNHUB")))
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
	candle := NewCandle()
	cacheKey := fmt.Sprintf("quote-%s", symbol)
	// Check the cache
	rawCandle, cacheErr := s.cache.Get(context.Background(), cacheKey)
	if cacheErr == nil {
		candle.FromBytes(rawCandle)
		return candle, nil
	}
	// Query
	quoteErr := s.source.Quote(candle, symbol)
	if quoteErr != nil {
		candle.Release()
		return nil, quoteErr
	}
	s.cache.Set(context.Background(), cacheKey, candle.Bytes(), store.WithExpiration(time.Minute))
	return candle, nil
}

func (s *Store) Candles(res Resolution, symbol string, from, to time.Time) []*Candle {
	panic("implement me!")
}
