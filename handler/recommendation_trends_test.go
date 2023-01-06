package handler

import (
	"net/http"
	"testing"

	"github.com/shoriwe/tulip/store"
	"github.com/stretchr/testify/assert"
)

func TestHandler_RecommendationTrends(t *testing.T) {
	server, expect := NewTestHandler(t)
	defer server.Close()
	trendObject := expect.GET(RecommendationTrendsRoute + "AAPL").
		Expect().
		Status(http.StatusOK).
		JSON().
		Object()
	trend := store.RecommendationTrends{
		Buy:        int64(trendObject.Value("buy").Number().Raw()),
		StrongBuy:  int64(trendObject.Value("strongBuy").Number().Raw()),
		Hold:       int64(trendObject.Value("hold").Number().Raw()),
		Sell:       int64(trendObject.Value("sell").Number().Raw()),
		StrongSell: int64(trendObject.Value("strongSell").Number().Raw()),
	}
	total := trend.Buy + trend.StrongBuy + trend.Sell + trend.StrongSell + trend.Hold
	assert.Greater(t, total, int64(0))
	assert.GreaterOrEqual(t, trend.Buy, int64(0))
	assert.GreaterOrEqual(t, trend.StrongBuy, int64(0))
	assert.GreaterOrEqual(t, trend.Sell, int64(0))
	assert.GreaterOrEqual(t, trend.StrongSell, int64(0))
	assert.GreaterOrEqual(t, trend.Hold, int64(0))
}
