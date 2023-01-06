package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Candles(ctx echo.Context) error {
	// Resolution param
	res, ok := Resolutions[ctx.Param(ResolutionParam)]
	if !ok {
		return fmt.Errorf("unknown resolution: %s", ctx.Param(ResolutionParam))
	}
	// Symbol param
	symbol := ctx.Param(SymbolParam)
	// From param
	fromInt, fromErr := strconv.ParseInt(ctx.Param(FromParam), 10, 64)
	if fromErr != nil {
		return fromErr
	}
	from := time.UnixMilli(fromInt)
	// To param
	toInt, toErr := strconv.ParseInt(ctx.Param(ToParam), 10, 64)
	if toErr != nil {
		return toErr
	}
	to := time.UnixMilli(toInt)
	candles, cErr := h.store.Candles(res, symbol, from, to)
	if cErr != nil {
		return cErr
	}
	return ctx.JSON(http.StatusOK, candles)
}
