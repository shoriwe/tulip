package api

import (
	"net/http"
	"testing"
)

func TestAPI_Peers(t *testing.T) {
	server, expect := NewTestAPI(t)
	defer server.Close()
	expect.GET(PeersRoute + "AAPL").
		Expect().
		Status(http.StatusOK).
		JSON().
		Array().Length().Ge(0)
}
