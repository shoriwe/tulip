package handler

import (
	"github.com/shoriwe/tulip/store"
)

const (
	SymbolParam     = "symbol"
	ResolutionParam = "res"
	FromParam       = "from"
	ToParam         = "to"
	LastParam       = "last"
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

const (
	ComponentsRoute = "/components"
	APIRoute        = "/api"
)

const (
	CandlesComponentRoute = "/candles"
)
