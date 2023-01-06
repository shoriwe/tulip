package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Quote(ctx echo.Context) error {
	candle, qErr := h.store.Quote(ctx.Param(SymbolParam))
	if qErr != nil {
		return qErr
	}
	return ctx.JSON(http.StatusOK, candle)
}
