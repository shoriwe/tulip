package cmd

import (
	"os"
	"strings"

	"github.com/eko/gocache/lib/v4/cache"
	"github.com/shoriwe/tulip/common"
	"github.com/spf13/cobra"
	"gorm.io/gorm"
)

var (
	listen *string
	db     *gorm.DB
	c      *cache.Cache[[]byte]
)

var rootCmd = &cobra.Command{
	Use:   "tulip",
	Short: "tulip market data REST API",
	Long: `tulip is a market data REST API intended to be used as a 
single interface for querying and chaching different market data sources`,
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	listen = rootCmd.PersistentFlags().StringP("listen", "l", "127.0.0.1:5000", "Listen address for the REST API")
	sqlURL := rootCmd.PersistentFlags().StringP("sql", "s", "sqlite://file::memory:?cache=shared", "SQLite URL or PostgreSQL URL")
	cacheSource := rootCmd.PersistentFlags().StringP("cache", "x", ":memory:", "Memory cache or redis address")

	if strings.Index(*sqlURL, "sqlite://") == 0 {
		db = common.NewSQLite((*sqlURL)[9:])
	}
	if *cacheSource == ":memory:" {
		c = common.NewBigCache()
	}
}
