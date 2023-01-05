package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (a *API) Peers(ctx echo.Context) error {
	peers, pErr := a.store.Peers(ctx.Param(SymbolParam))
	if pErr != nil {
		return pErr
	}
	return ctx.JSON(http.StatusOK, peers)
}
