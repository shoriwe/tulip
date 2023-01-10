package handler

import (
	"net/http"
	"testing"
)

func TestHandler_Quote(t *testing.T) {
	close, expect := NewTestHandler(t)
	defer close()
	candleObject := expect.GET(APIRoute + QuoteRoute + "AAPL").
		Expect().
		Status(http.StatusOK).
		JSON().
		Object()
	candleObject.Value("open").Number().Ge(0.0)
	candleObject.Value("high").Number().Ge(0.0)
	candleObject.Value("low").Number().Ge(0.0)
	candleObject.Value("close").Number().Ge(0.0)
	candleObject.Value("prevClose").Number().Ge(0.0)
}
