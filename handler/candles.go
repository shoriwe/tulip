package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/shoriwe/tulip/store"
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

// TODO: Unit test me!
func (h *Handler) CandlesSVG(ctx echo.Context) error {
	// Resolution param
	res, ok := Resolutions[ctx.QueryParam(ResolutionParam)]
	if !ok {
		return fmt.Errorf("unknown resolution: %s", ctx.QueryParam(ResolutionParam))
	}
	// Symbol param
	symbol := ctx.QueryParam(SymbolParam)
	// Timeframe
	var from, to time.Time
	switch {
	case ctx.QueryParam(LastParam) != "":
		to = time.Now()
		last, lastErr := strconv.ParseInt(ctx.QueryParam(LastParam), 10, 64)
		if lastErr != nil {
			return lastErr
		}
		switch res {
		case store.Minute:
			from = to.Add(time.Duration(last) * time.Minute)
		case store.Hour:
			from = to.Add(time.Duration(last) * time.Hour)
		case store.Day:
			from = to.AddDate(0, 0, -int(last))
		case store.Month:
			from = to.AddDate(0, -int(last), 0)
		}
	case ctx.QueryParam(FromParam) != "" && ctx.QueryParam(ToParam) != "":
		// From param
		fromInt, fromErr := strconv.ParseInt(ctx.QueryParam(FromParam), 10, 64)
		if fromErr != nil {
			return fromErr
		}
		from = time.UnixMilli(fromInt)
		// To param
		toInt, toErr := strconv.ParseInt(ctx.QueryParam(ToParam), 10, 64)
		if toErr != nil {
			return toErr
		}
		to = time.UnixMilli(toInt)
	default:
		return fmt.Errorf("no timeframe specified")
	}
	candles, cErr := h.store.Candles(res, symbol, from, to)
	if cErr != nil {
		return cErr
	}
	// candlestick := Candlestick{Candles: candles}
	return ctx.JSON(http.StatusOK, candles)
}
