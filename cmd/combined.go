package cmd

import (
	"log"

	"github.com/shoriwe/tulip/handler"
	"github.com/shoriwe/tulip/store"
	"github.com/spf13/cobra"
)

var (
	combinedUseYahoo     *bool
	combinedFinnhubToken *string
)

var combinedCmd = &cobra.Command{
	Use:   "combined",
	Short: "Combined source pipe",
	Long:  `Combined source pipe, uses different sources if other fails to fetch data`,
	Run: func(cmd *cobra.Command, args []string) {
		var sources []store.Source
		if *combinedFinnhubToken != "" {
			sources = append(sources, store.NewFinnhub(*combinedFinnhubToken))
		}
		if *combinedUseYahoo {
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
	combinedFinnhubToken = combinedCmd.Flags().StringP("finnhub", "f", "", "Sets Finnhub API Key. Adds to Finnhub Source to the pipe")
	combinedUseYahoo = combinedCmd.Flags().BoolP("yahoo", "y", false, "Adds to Yahoo finance Source to the pipe")
}
