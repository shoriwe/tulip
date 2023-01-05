package api

import "github.com/shoriwe/tulip/store"

const (
	SymbolParam     = "symbol"
	ResolutionParam = "res"
	FromParam       = "from"
	ToParam         = "to"
)

const (
	SymbolQuoteRoute             = "/symbol/quote/"
	SymbolQuoteRouteWithParams   = SymbolQuoteRoute + ":" + SymbolParam
	SymbolCandlesRoute           = "/symbol/candles/"
	SymbolCandlesRouteWithParams = SymbolCandlesRoute + ":" +
		SymbolParam + "/:" +
		ResolutionParam + "/:" +
		FromParam + "/:" +
		ToParam
)

const (
	Minute = "1"
	Hour   = "60"
	Day    = "D"
	Month  = "M"
)

var Resolutions = map[string]store.Resolution{
	Minute: store.Minute,
	Hour:   store.Hour,
	Day:    store.Day,
	Month:  store.Month,
}
