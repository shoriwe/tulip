package store

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestCandle(t *testing.T) {
	t.Run("Bytes", func(t *testing.T) {
		candle := NewCandle()
		defer candle.Release()
		candle.Symbol = "AAPL"
		candle.Timestamp = time.UnixMilli(time.Now().UnixMilli())
		candle.Resolution = Day
		candle.Open = 100
		candle.High = 110
		candle.Low = 90
		candle.Close = 105
		candle.PrevClose = 105
		candle.Volume = 100000

		bytes := candle.Bytes()

		otherCandle := NewCandle()
		defer otherCandle.Release()
		otherCandle.FromBytes(bytes)
		assert.Equal(t, *candle, *otherCandle)
	})
}
