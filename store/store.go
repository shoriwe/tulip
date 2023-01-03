package store

import (
	"context"
	"time"

	"github.com/go-redis/redis/v9"
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
		cache  *redis.Client
		source Source
	}
)

func (s *Store) Quote(symbol string) (*Candle, error) {
	candle := NewCandle()
	// Check the cache
	var rawCandle []byte
	cacheErr := s.cache.Get(context.Background(), symbol).Scan(&rawCandle)
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
	s.cache.Set(context.Background(), symbol, candle.Bytes(), time.Minute)
	return candle, nil
}

func (s *Store) Candles(res Resolution, symbol string, from, to time.Time) []*Candle {
	panic("implement me!")
}
