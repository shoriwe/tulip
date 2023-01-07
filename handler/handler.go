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
	h := &Handler{
		store: store,
	}
	e := echo.New()
	// API
	api := e.Group(APIRoute)
	api.GET(QuoteRouteWithParams, h.Quote)
	api.GET(CandlesRouteWithParams, h.Candles)
	api.GET(RecommendationTrendsRouteWithParams, h.RecommendationTrends)
	api.GET(PeersRouteWithParams, h.Peers)
	// Components
	components := e.Group(ComponentsRoute)
	components.GET(CandlesComponentRoute, h.CandlesSVG)
	return e
}

func NewTestHandler(t *testing.T) (*httptest.Server, *httpexpect.Expect) {
	a := NewHandler(store.NewTestStore())
	server := httptest.NewServer(a)
	expect := httpexpect.Default(t, server.URL)
	return server, expect
}
