package api

import (
	"net/http/httptest"
	"testing"

	"github.com/gavv/httpexpect/v2"
	"github.com/labstack/echo/v4"
	"github.com/shoriwe/tulip/store"
)

type API struct {
	store *store.Store
}

func NewAPI(store *store.Store) *echo.Echo {
	api := &API{
		store: store,
	}
	e := echo.New()
	e.GET(SymbolQuoteRouteWithParams, api.SymbolQuote)
	e.GET(SymbolCandlesRouteWithParams, api.SymbolCandles)
	return e
}

func NewTestAPI(t *testing.T) (*httptest.Server, *httpexpect.Expect) {
	a := NewAPI(store.NewTestStore())
	server := httptest.NewServer(a)
	expect := httpexpect.Default(t, server.URL)
	return server, expect
}
