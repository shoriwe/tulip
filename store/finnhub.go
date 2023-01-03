package store

import (
	"context"
	"fmt"
	"time"

	"github.com/Finnhub-Stock-API/finnhub-go"
)

var (
	finnhubResolution = map[Resolution]string{
		Minute: "1",
		Hour:   "60",
		Day:    "D",
		Month:  "M",
	}
)

type Finnhub struct {
	api *finnhub.DefaultApiService
}

func NewFinnhub(token string) Source {
	cfg := finnhub.NewConfiguration()
	cfg.AddDefaultHeader("X-Finnhub-Token", token)
	finnhubClient := finnhub.NewAPIClient(cfg).DefaultApi
	return &Finnhub{api: finnhubClient}
}

func (f *Finnhub) Quote(symbol string) (*Candle, error) {
	quote, _, err := f.api.Quote(context.Background(), symbol)
	if err != nil {
		// Try historical
		now := time.Now()
		from := now.Add(-7 * time.Minute)
		candles, cErr := f.Candles(Day, symbol, from, now)
		if cErr != nil {
			return nil, cErr
		}
		if len(candles) < 1 {
			return nil, fmt.Errorf("no results founds")
		}
		return candles[len(candles)-1], nil
	}
	return &Candle{
		Open:      float64(quote.O),
		High:      float64(quote.H),
		Low:       float64(quote.L),
		Close:     float64(quote.C),
		PrevClose: float64(quote.Pc),
	}, nil
}

func (f *Finnhub) Candles(res Resolution, symbol string, from time.Time, to time.Time) ([]*Candle, error) {
	sCandles, _, cErr := f.api.StockCandles(
		context.Background(),
		symbol,
		finnhubResolution[res],
		from.Unix(),
		to.Unix(),
		nil,
	)
	if cErr != nil {
		return nil, cErr
	}
	candles := make([]*Candle, 0, len(sCandles.C))
	for index := 0; index < len(sCandles.C); index++ {
		candle := &Candle{}
		candle.High = float64(sCandles.H[index])
		candle.Open = float64(sCandles.O[index])
		candle.Low = float64(sCandles.L[index])
		candle.Close = float64(sCandles.C[index])
		candle.Timestamp = time.Unix(sCandles.T[index], 0)
		candle.Volume = float64(sCandles.V[index])

		candles = append(candles, candle)
	}
	return candles, nil
}
