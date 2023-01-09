package cmd

import (
	"log"

	"github.com/shoriwe/tulip/handler"
	"github.com/shoriwe/tulip/store"
	"github.com/spf13/cobra"
)

var yahooCmd = &cobra.Command{
	Use:   "yahoo",
	Short: "Use Yahoo finance as data source",
	Long:  `Use Yahoo finance as data source`,
	Run: func(cmd *cobra.Command, args []string) {
		source := store.NewYahoo()
		s := store.NewStore(db, c, source)
		server := handler.NewHandler(s)
		serverErr := server.Start(*listen)
		if serverErr != nil {
			log.Fatal(serverErr)
		}
	},
}

func init() {
	rootCmd.AddCommand(yahooCmd)
}
