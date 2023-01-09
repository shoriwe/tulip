package store

import "time"

type NOP struct {
}

func NewNOP() Source {
	return &NOP{}
}

func (nop *NOP) Quote(symbol string) (*Candle, error) { return nil, nil }
func (nop *NOP) Candles(res Resolution, symbol string, from, to time.Time) ([]*Candle, error) {
	return nil, nil
}
func (nop *NOP) Peers(symbol string) ([]string, error)                             { return nil, nil }
func (nop *NOP) RecommendationTrends(symbol string) (*RecommendationTrends, error) { return nil, nil }
