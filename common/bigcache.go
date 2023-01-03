package common

import (
	"context"
	"time"

	"github.com/allegro/bigcache/v3"
	"github.com/eko/gocache/lib/v4/cache"
	bigcache_store "github.com/eko/gocache/store/bigcache/v4"
)

func NewBigCache() *cache.Cache[[]byte] {
	bigcacheClient, _ := bigcache.New(context.Background(), bigcache.DefaultConfig(5*time.Minute))
	bigcacheStore := bigcache_store.NewBigcache(bigcacheClient)
	return cache.New[[]byte](bigcacheStore)
}
