package common

import (
	"github.com/eko/gocache/lib/v4/cache"
	redis_store "github.com/eko/gocache/store/redis/v4"
	"github.com/go-redis/redis/v8"
)

func NewRedis(options *redis.Options) *cache.Cache[[]byte] {
	client := redis.NewClient(options)
	redisStore := redis_store.NewRedis(client)
	return cache.New[[]byte](redisStore)
}
