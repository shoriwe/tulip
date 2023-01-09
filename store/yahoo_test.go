package store

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestYahoo(t *testing.T) {
	t.Run("Quote",
		func(t *testing.T) {
			candle, qErr := NewYahoo().Quote("AAPL")
			assert.Nil(t, qErr)
			assert.Greater(t, candle.Close, 0.0)
		},
	)
	t.Run("Candles",
		func(t *testing.T) {
			now := time.Now()
			from := now.Add(-1000 * 24 * time.Hour)
			candles, cErr := NewYahoo().Candles(Day, "AAPL", from, now)
			assert.Nil(t, cErr)
			assert.Greater(t, len(candles), 0)
			candle := candles[0]
			assert.Greater(t, candle.Open, 0.0)
			assert.Greater(t, candle.High, 0.0)
			assert.Greater(t, candle.Low, 0.0)
			assert.Greater(t, candle.Close, 0.0)
			assert.Greater(t, candle.Volume, 0.0)
		},
	)
	t.Run("RecommendationTrends",
		func(t *testing.T) {
			trend, tErr := NewYahoo().RecommendationTrends("AAPL")
			assert.Nil(t, tErr)
			total := trend.Buy + trend.StrongBuy + trend.Sell + trend.StrongSell + trend.Hold
			assert.Greater(t, total, int64(0))
			assert.GreaterOrEqual(t, trend.Buy, int64(0))
			assert.GreaterOrEqual(t, trend.StrongBuy, int64(0))
			assert.GreaterOrEqual(t, trend.Sell, int64(0))
			assert.GreaterOrEqual(t, trend.StrongSell, int64(0))
			assert.GreaterOrEqual(t, trend.Hold, int64(0))
		},
	)

}
