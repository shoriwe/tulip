package store

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestStore(t *testing.T) {
	t.Run("Quote", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		c, qErr := s.Quote("AAPL")
		assert.Nil(t, qErr)
		assert.NotNil(t, c)
		c2, qErr2 := s.Quote("AAPL")
		assert.Nil(t, qErr2)
		assert.NotNil(t, c2)
		assert.Equal(t, *c, *c2)
	})
	t.Run("Candles", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		now := time.Now()
		from := now.Add(-3 * 31 * 24 * time.Hour)
		candles, qErr := s.Candles(Month, "AAPL", from, now)
		assert.Nil(t, qErr)
		assert.NotNil(t, candles)
		// Repeat but expect caching
		candles, qErr = s.Candles(Month, "AAPL", from, now)
		assert.Nil(t, qErr)
		assert.NotNil(t, candles)
		// Query a bit before
		candles, qErr = s.Candles(Month, "AAPL", from.Add(-5*31*24*time.Hour), from.Add(2*31*24*time.Hour))
		assert.Nil(t, qErr)
		assert.NotNil(t, candles)
		// Query all
		candles, qErr = s.Candles(Month, "AAPL", from.Add(-5*31*24*time.Hour), now)
		assert.Nil(t, qErr)
		assert.NotNil(t, candles)
	})
	t.Run("RecommendationTrends", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		trend, tErr := s.RecommendationTrends("AAPL")
		assert.Nil(t, tErr)
		total := trend.Buy + trend.StrongBuy + trend.Sell + trend.StrongSell + trend.Hold
		assert.Greater(t, total, int64(0))
		assert.GreaterOrEqual(t, trend.Buy, int64(0))
		assert.GreaterOrEqual(t, trend.StrongBuy, int64(0))
		assert.GreaterOrEqual(t, trend.Sell, int64(0))
		assert.GreaterOrEqual(t, trend.StrongSell, int64(0))
		assert.GreaterOrEqual(t, trend.Hold, int64(0))
		// Repeat expect caching
		trend, tErr = s.RecommendationTrends("AAPL")
		assert.Nil(t, tErr)
		total = trend.Buy + trend.StrongBuy + trend.Sell + trend.StrongSell + trend.Hold
		assert.Greater(t, total, int64(0))
		assert.GreaterOrEqual(t, trend.Buy, int64(0))
		assert.GreaterOrEqual(t, trend.StrongBuy, int64(0))
		assert.GreaterOrEqual(t, trend.Sell, int64(0))
		assert.GreaterOrEqual(t, trend.StrongSell, int64(0))
		assert.GreaterOrEqual(t, trend.Hold, int64(0))
	})
	t.Run("Peers", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		peers, pErr := s.Peers("AAPL")
		assert.Nil(t, pErr)
		assert.NotNil(t, peers)
		// Repeat but expect caching
		peers, pErr = s.Peers("AAPL")
		assert.Nil(t, pErr)
		assert.NotNil(t, peers)
	})
}
