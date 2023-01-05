package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (a *API) RecommendationTrends(ctx echo.Context) error {
	trends, tErr := a.store.RecommendationTrends(ctx.Param(SymbolParam))
	if tErr != nil {
		return tErr
	}
	return ctx.JSON(http.StatusOK, trends)
}
