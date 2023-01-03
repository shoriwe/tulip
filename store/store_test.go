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
}
