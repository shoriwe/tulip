package store

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRecommendationTrends(t *testing.T) {
	t.Run("Bytes", func(t *testing.T) {
		trend := &RecommendationTrends{
			Buy:        10,
			StrongBuy:  30,
			Sell:       0,
			StrongSell: 0,
			Hold:       20,
		}
		otherTrend := &RecommendationTrends{}
		otherTrend.FromBytes(trend.Bytes())
		assert.Equal(t, *trend, *otherTrend)
	})
}
