package handler

import (
	"net/http"
	"testing"
)

func TestHandler_Peers(t *testing.T) {
	close, expect := NewTestHandler(t)
	defer close()
	expect.GET(APIRoute + PeersRoute + "AAPL").
		Expect().
		Status(http.StatusOK).
		JSON().
		Array().Length().Ge(0)
}
