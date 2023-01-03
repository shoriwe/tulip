package common

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBigCache(t *testing.T) {
	t.Run("New", func(t *testing.T) {
		c := NewBigCache()
		c.Set(context.Background(), "TEST", []byte("Hello"))
		value, err := c.Get(context.Background(), "TEST")
		assert.Nil(t, err)
		assert.Equal(t, "Hello", string(value))
	})
}
