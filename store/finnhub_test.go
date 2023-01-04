package store

import (
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

var finnhubToken string

func init() {
	finnhubToken = os.Getenv("FINNHUB")
	if finnhubToken == "" {
		panic("FINNHUB env var not set")
	}
}

func TestFinnhub(t *testing.T) {
	t.Run("Quote",
		func(t *testing.T) {
			candle, qErr := NewFinnhub(finnhubToken).Quote("AAPL")
			assert.Nil(t, qErr)
			assert.Greater(t, candle.Open, 0.0)
			assert.Greater(t, candle.High, 0.0)
			assert.Greater(t, candle.Low, 0.0)
			assert.Greater(t, candle.Close, 0.0)
			assert.Greater(t, candle.PrevClose, 0.0)
		},
	)
	t.Run("Candles",
		func(t *testing.T) {
			now := time.Now()
			from := now.Add(-1000 * 24 * time.Hour)
			candles, cErr := NewFinnhub(finnhubToken).Candles(Day, "AAPL", from, now)
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
			trend, tErr := NewFinnhub(finnhubToken).RecommendationTrends("AAPL")
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
