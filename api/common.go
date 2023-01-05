package api

import "github.com/shoriwe/tulip/store"

const (
	SymbolParam     = "symbol"
	ResolutionParam = "res"
	FromParam       = "from"
	ToParam         = "to"
)

const (
	QuoteRoute             = "/quote/"
	QuoteRouteWithParams   = QuoteRoute + ":" + SymbolParam
	CandlesRoute           = "/candles/"
	CandlesRouteWithParams = CandlesRoute + ":" +
		SymbolParam + "/:" +
		ResolutionParam + "/:" +
		FromParam + "/:" +
		ToParam
	RecommendationTrendsRoute           = "/recommendation/trends/"
	RecommendationTrendsRouteWithParams = RecommendationTrendsRoute + ":" + SymbolParam
	PeersRoute                          = "/peers/"
	PeersRouteWithParams                = PeersRoute + ":" + SymbolParam
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
