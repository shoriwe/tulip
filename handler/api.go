package handler

import (
	"net/http/httptest"
	"testing"

	"github.com/gavv/httpexpect/v2"
	"github.com/labstack/echo/v4"
	"github.com/shoriwe/tulip/store"
)

type Handler struct {
	store *store.Store
}

func NewHandler(store *store.Store) *echo.Echo {
	api := &Handler{
		store: store,
	}
	e := echo.New()
	// Routes
	e.GET(QuoteRouteWithParams, api.Quote)
	e.GET(CandlesRouteWithParams, api.Candles)
	e.GET(RecommendationTrendsRouteWithParams, api.RecommendationTrends)
	e.GET(PeersRouteWithParams, api.Peers)
	//
	return e
}

func NewTestHandler(t *testing.T) (*httptest.Server, *httpexpect.Expect) {
	a := NewHandler(store.NewTestStore())
	server := httptest.NewServer(a)
	expect := httpexpect.Default(t, server.URL)
	return server, expect
}
