package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) RecommendationTrends(ctx echo.Context) error {
	trends, tErr := h.store.RecommendationTrends(ctx.Param(SymbolParam))
	if tErr != nil {
		return tErr
	}
	return ctx.JSON(http.StatusOK, trends)
}
