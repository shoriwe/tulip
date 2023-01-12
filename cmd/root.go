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
	rootListenAddress *string
	rootSQLUrl        *string
	rootCache         *string
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

func createDB() *gorm.DB {
	if strings.Index(*rootSQLUrl, "sqlite://") == 0 {
		sqliteFile := (*rootSQLUrl)[9:]
		db := common.NewSQLite(sqliteFile)
		if sqliteFile == "sqlite://file::memory:?cache=shared" {
			return db
		}
		sqliteDB, err := db.DB()
		if err != nil {
			panic(err)
		}
		sqliteDB.SetMaxOpenConns(1)
		return db
	}
	panic("sqlite is only supported by the moment")
}

func createCache() *cache.Cache[[]byte] {
	if *rootCache == ":memory:" {
		return common.NewBigCache()
	}
	panic("in memory cache is only supported by the moment")
}

func init() {
	rootListenAddress = rootCmd.PersistentFlags().StringP("listen", "l", "127.0.0.1:5000", "Listen address for the REST API")
	rootSQLUrl = rootCmd.PersistentFlags().StringP("sql", "s", "sqlite://file::memory:?cache=shared", "SQLite URL or PostgreSQL URL")
	rootCache = rootCmd.PersistentFlags().StringP("cache", "x", ":memory:", "Memory cache or redis address")

}
