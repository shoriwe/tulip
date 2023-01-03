package store

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStore(t *testing.T) {
	t.Run("Quote", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		c, qErr := s.Quote("AAPL")
		assert.Nil(t, qErr)
		assert.NotNil(t, c)
		defer c.Release()
		c2, qErr2 := s.Quote("AAPL")
		assert.Nil(t, qErr2)
		assert.NotNil(t, c2)
		defer c2.Release()
		assert.Equal(t, *c, *c2)
	})
}
