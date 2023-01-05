package api

import (
	"fmt"
	"net/http"
	"strconv"
	"testing"
	"time"

	"github.com/shoriwe/tulip/store"
)

func TestAPI_SymbolCandles(t *testing.T) {
	server, expect := NewTestAPI(t)
	defer server.Close()
	now := time.Now()
	route := fmt.Sprintf("%s%s/%s/%s/%s",
		SymbolCandlesRoute, "AAPL",
		Month,
		strconv.FormatInt(now.Add(-1000*24*time.Hour).UnixMilli(), 10),
		strconv.FormatInt(now.UnixMilli(), 10),
	)
	candles := expect.GET(route).
		Expect().
		Status(http.StatusOK).
		JSON().
		Array()
	candles.Length().Ge(0)
	candleObject := candles.First().Object()
	candleObject.Value("open").Number().Ge(0.0)
	candleObject.Value("high").Number().Ge(0.0)
	candleObject.Value("low").Number().Ge(0.0)
	candleObject.Value("close").Number().Ge(0.0)
	candleObject.Value("resolution").Number().Equal(store.Month)
	candleObject.Value("symbol").String().Equal("AAPL")
	candleObject.Value("volume").Number().Ge(0.0)
}
