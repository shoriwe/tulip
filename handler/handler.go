package handler

import (
	"io/fs"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gavv/httpexpect/v2"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/shoriwe/tulip/components"
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
	e.Use(middleware.CORS())
	// API
	api := e.Group(APIRoute)
	api.GET(QuoteRouteWithParams, h.Quote)
	api.GET(CandlesRouteWithParams, h.Candles)
	api.GET(RecommendationTrendsRouteWithParams, h.RecommendationTrends)
	api.GET(PeersRouteWithParams, h.Peers)
	api.PUT(NotesRoute, h.CreateNote)
	api.GET(NotesRoute, h.ListNotes)
	api.GET(NotesRouteWithParams, h.GetNote)
	api.PATCH(NotesRouteWithParams, h.UpdateNote)
	api.DELETE(NotesRouteWithParams, h.DeleteNote)
	// Components
	c := e.Group(ComponentsRoute)
	fsys, err := fs.Sub(components.Components, "build")
	if err != nil {
		panic(err)
	}
	c.GET("/*", echo.WrapHandler(http.StripPrefix(ComponentsRoute+"/", http.FileServer(http.FS(fsys)))))
	return e
}

func NewTestHandler(t *testing.T) (func(), *httpexpect.Expect) {
	s := store.NewTestStore()
	a := NewHandler(s)
	server := httptest.NewServer(a)
	expect := httpexpect.Default(t, server.URL)
	return func() { s.Close(); server.Close() }, expect
}
