package store

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Yahoo struct {
	http.Client
}

func NewYahoo() Source {
	return &Yahoo{}
}

type yahooFinancialData struct {
	QuoteSummary struct {
		Result []struct {
			FinancialData struct {
				CurrentPrice struct {
					Raw float64 `json:"raw"`
				} `json:"currentPrice"`
			} `json:"financialData"`
			RecommendationTrend struct {
				Trend []struct {
					Period     string `json:"period"`
					StrongBuy  int64  `json:"strongBuy"`
					Buy        int64  `json:"buy"`
					Sell       int64  `json:"sell"`
					Hold       int64  `json:"hold"`
					StrongSell int64  `json:"strongSell"`
				} `json:"trend"`
			} `json:"recommendationTrend"`
		} `json:"result"`
		Error string `json:"error"`
	} `json:"quoteSummary"`
}

func (y *Yahoo) Quote(symbol string) (*Candle, error) {
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v11/finance/quoteSummary/%s?modules=financialData", symbol)
	response, err := y.Get(url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()
	var financialData yahooFinancialData
	decodeErr := json.NewDecoder(response.Body).Decode(&financialData)
	if decodeErr != nil {
		return nil, decodeErr
	}
	if financialData.QuoteSummary.Error != "" {
		return nil, fmt.Errorf(financialData.QuoteSummary.Error)
	}
	if len(financialData.QuoteSummary.Result) == 0 {
		return nil, fmt.Errorf("no data obtained")
	}
	currentPrice := financialData.QuoteSummary.Result[0].FinancialData.CurrentPrice.Raw
	candle := &Candle{
		Close: currentPrice,
	}
	return candle, nil
}

type yahooChart struct {
	Chart struct {
		Result []struct {
			Timestamp  []int64 `json:"timestamp"`
			Indicators struct {
				Quote []struct {
					Volume []float64 `json:"volume"`
					High   []float64 `json:"high"`
					Close  []float64 `json:"close"`
					Low    []float64 `json:"low"`
					Open   []float64 `json:"open"`
				} `json:"quote"`
			} `json:"indicators"`
		} `json:"result"`
		Error string `json:"error"`
	} `json:"chart"`
}

func (y *Yahoo) Candles(res Resolution, symbol string, from, to time.Time) ([]*Candle, error) {
	resolution, ok := yahooResolution[res]
	if !ok {
		return nil, fmt.Errorf("unknown resolution %d", res)
	}
	url := fmt.Sprintf(
		"https://query1.finance.yahoo.com/v8/finance/chart/%s?interval=%s&period1=%d&period2=%d",
		symbol, resolution, from.Unix(), to.Unix(),
	)
	response, err := y.Get(url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()
	var chart yahooChart
	decodeErr := json.NewDecoder(response.Body).Decode(&chart)
	if decodeErr != nil {
		return nil, decodeErr
	}
	if chart.Chart.Error != "" {
		return nil, fmt.Errorf(chart.Chart.Error)
	}
	if len(chart.Chart.Result) == 0 || (len(chart.Chart.Result) != 0 && len(chart.Chart.Result[0].Indicators.Quote) == 0) {
		return nil, fmt.Errorf("no results found")
	}
	candles := make([]*Candle, 0, len(chart.Chart.Result[0].Timestamp))
	for index := range chart.Chart.Result[0].Timestamp {
		candles = append(candles,
			&Candle{
				Symbol:     symbol,
				Timestamp:  time.Unix(chart.Chart.Result[0].Timestamp[index], 0),
				Resolution: res,
				Open:       chart.Chart.Result[0].Indicators.Quote[0].Open[index],
				Close:      chart.Chart.Result[0].Indicators.Quote[0].Close[index],
				High:       chart.Chart.Result[0].Indicators.Quote[0].High[index],
				Low:        chart.Chart.Result[0].Indicators.Quote[0].Low[index],
				Volume:     chart.Chart.Result[0].Indicators.Quote[0].Volume[index],
			})
	}
	return candles, nil
}

func (y *Yahoo) Peers(symbol string) ([]string, error) {
	return nil, fmt.Errorf("peers not supported by Yahoo finance")
}

func (y *Yahoo) RecommendationTrends(symbol string) (*RecommendationTrends, error) {
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v11/finance/quoteSummary/%s?modules=recommendationTrend", symbol)
	response, err := y.Get(url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()
	var financialData yahooFinancialData
	decodeErr := json.NewDecoder(response.Body).Decode(&financialData)
	if decodeErr != nil {
		return nil, decodeErr
	}
	if financialData.QuoteSummary.Error != "" {
		return nil, fmt.Errorf(financialData.QuoteSummary.Error)
	}
	if len(financialData.QuoteSummary.Result) == 0 ||
		(len(financialData.QuoteSummary.Result) != 0 && len(financialData.QuoteSummary.Result[0].RecommendationTrend.Trend) == 0) {
		return nil, fmt.Errorf("no data obtained")
	}
	var trendIndex int
	for index, t := range financialData.QuoteSummary.Result[0].RecommendationTrend.Trend {
		if t.Period == "0m" {
			trendIndex = index
			break
		}
	}
	trend := &RecommendationTrends{
		Buy:        financialData.QuoteSummary.Result[0].RecommendationTrend.Trend[trendIndex].Buy,
		Sell:       financialData.QuoteSummary.Result[0].RecommendationTrend.Trend[trendIndex].Sell,
		StrongBuy:  financialData.QuoteSummary.Result[0].RecommendationTrend.Trend[trendIndex].StrongBuy,
		StrongSell: financialData.QuoteSummary.Result[0].RecommendationTrend.Trend[trendIndex].StrongSell,
		Hold:       financialData.QuoteSummary.Result[0].RecommendationTrend.Trend[trendIndex].Hold,
	}
	return trend, nil
}

var yahooResolution = map[Resolution]string{
	Minute: "1m",
	Hour:   "60m",
	Day:    "1d",
	Month:  "1mo",
}
