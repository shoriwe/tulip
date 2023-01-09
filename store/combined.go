package store

import "time"

type Combined struct {
	sources []Source
}

func (c *Combined) Quote(symbol string) (*Candle, error) {
	var (
		candle  *Candle
		lastErr error
	)
	for _, source := range c.sources {
		candle, lastErr = source.Quote(symbol)
		if lastErr == nil {
			return candle, nil
		}
	}
	return nil, lastErr
}

func (c *Combined) Candles(res Resolution, symbol string, from, to time.Time) ([]*Candle, error) {
	var (
		candles []*Candle
		lastErr error
	)
	for _, source := range c.sources {
		candles, lastErr = source.Candles(res, symbol, from, to)
		if lastErr == nil {
			return candles, nil
		}
	}
	return nil, lastErr
}

func (c *Combined) Peers(symbol string) ([]string, error) {
	var (
		peers   []string
		lastErr error
	)
	for _, source := range c.sources {
		peers, lastErr = source.Peers(symbol)
		if lastErr == nil {
			return peers, nil
		}
	}
	return nil, lastErr
}

func (c *Combined) RecommendationTrends(symbol string) (*RecommendationTrends, error) {
	var (
		trend   *RecommendationTrends
		lastErr error
	)
	for _, source := range c.sources {
		trend, lastErr = source.RecommendationTrends(symbol)
		if lastErr == nil {
			return trend, nil
		}
	}
	return nil, lastErr
}

func NewCombined(source ...Source) Source {
	return &Combined{sources: source}
}
