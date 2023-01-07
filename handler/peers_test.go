package handler

import (
	"net/http"
	"testing"
)

func TestHandler_Peers(t *testing.T) {
	server, expect := NewTestHandler(t)
	defer server.Close()
	expect.GET(APIRoute + PeersRoute + "AAPL").
		Expect().
		Status(http.StatusOK).
		JSON().
		Array().Length().Ge(0)
}
