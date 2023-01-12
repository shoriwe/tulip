package store

import "time"

func NormalizeTimestamp(res Resolution, t time.Time) time.Time {
	switch res {
	case Minute:
		return time.Date(t.Year(), t.Month(), t.Day(), t.Hour(), t.Minute(), 0, 0, time.Local)
	case Hour:
		return time.Date(t.Year(), t.Month(), t.Day(), t.Hour(), 0, 0, 0, time.Local)
	case Day:
		return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, time.Local)
	case Month:
		return time.Date(t.Year(), t.Month(), 1, 0, 0, 0, 0, time.Local).AddDate(0, 1, -1)
	default:
		panic("invalid resolution")
	}
}

func NormalizeCandles(candles []*Candle) []*Candle {
	for _, candle := range candles {
		candle.Timestamp = NormalizeTimestamp(candle.Resolution, candle.Timestamp)
	}
	return candles
}
