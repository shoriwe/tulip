package cmd

import (
	"log"

	"github.com/shoriwe/tulip/handler"
	"github.com/shoriwe/tulip/store"
	"github.com/spf13/cobra"
)

var combinedCmd = &cobra.Command{
	Use:   "combined",
	Short: "Combined source pipe",
	Long:  `Combined source pipe, uses different sources if other fails to fetch data`,
	Run: func(cmd *cobra.Command, args []string) {
		var sources []store.Source
		if *finnhubToken != "" {
			sources = append(sources, store.NewFinnhub(*finnhubToken))
		}
		if *useYahoo {
			sources = append(sources, store.NewYahoo())
		}
		if len(sources) == 0 {
			sources = append(sources, store.NewNOP())
		}
		source := store.NewCombined(sources...)
		s := store.NewStore(db, c, source)
		server := handler.NewHandler(s)
		serverErr := server.Start(*listen)
		if serverErr != nil {
			log.Fatal(serverErr)
		}
	},
}

func init() {
	rootCmd.AddCommand(combinedCmd)
}
