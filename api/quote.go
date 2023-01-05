package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (a *API) Quote(ctx echo.Context) error {
	candle, qErr := a.store.Quote(ctx.Param(SymbolParam))
	if qErr != nil {
		return qErr
	}
	return ctx.JSON(http.StatusOK, candle)
}
