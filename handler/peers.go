package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Peers(ctx echo.Context) error {
	peers, pErr := h.store.Peers(ctx.Param(SymbolParam))
	if pErr != nil {
		return pErr
	}
	return ctx.JSON(http.StatusOK, peers)
}
