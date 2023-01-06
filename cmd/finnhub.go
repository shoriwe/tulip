package cmd

import (
	"log"

	"github.com/shoriwe/tulip/handler"
	"github.com/shoriwe/tulip/store"
	"github.com/spf13/cobra"
)

var (
	finnhubToken *string
)

var finnhubCmd = &cobra.Command{
	Use:   "finnhub",
	Short: "finnhub caching driver",
	Long:  `Use the finnhub caching driver to interfasce with the finnhub API`,
	Run: func(cmd *cobra.Command, args []string) {
		source := store.NewFinnhub(*finnhubToken)
		s := store.NewStore(db, c, source)
		server := handler.NewHandler(s)
		serverErr := server.Start(*listen)
		if serverErr != nil {
			log.Fatal(serverErr)
		}
	},
}

func init() {
	rootCmd.AddCommand(finnhubCmd)
	finnhubToken = finnhubCmd.Flags().StringP("token", "t", "", "Finnhub API Key")
}
