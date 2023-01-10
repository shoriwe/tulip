package handler

import (
	"fmt"
	"net/http"
	"testing"

	"github.com/shoriwe/tulip/store"
)

func TestHandler_Notes(t *testing.T) {
	t.Run("Create", func(t *testing.T) {
		close, expect := NewTestHandler(t)
		defer close()
		expect.
			PUT(fmt.Sprintf("%s%s", APIRoute, NotesRoute)).
			WithJSON(&store.Note{
				Name:    "Example note",
				Content: "Hello from example!!",
			}).
			Expect().
			Status(http.StatusOK)
		obj := expect.
			GET(fmt.Sprintf("%s%s/%s", APIRoute, NotesRoute, "Example note")).
			Expect().
			Status(http.StatusOK).
			JSON().
			Object()
		obj.Value("name").String().Equal("Example note")
		obj.Value("content").String().Equal("Hello from example!!")
	})
	t.Run("List", func(t *testing.T) {
		close, expect := NewTestHandler(t)
		defer close()
		expect.
			PUT(fmt.Sprintf("%s%s", APIRoute, NotesRoute)).
			WithJSON(&store.Note{
				Name:    "Example note",
				Content: "Hello from example!!",
			}).
			Expect().
			Status(http.StatusOK)
		notes := expect.
			GET(fmt.Sprintf("%s%s", APIRoute, NotesRoute)).
			Expect().
			Status(http.StatusOK).
			JSON().
			Array()
		notes.Length().Equal(1)
		obj := notes.First().Object()
		obj.Value("name").String().Equal("Example note")
		obj.Value("content").String().Equal("Hello from example!!")
	})
	t.Run("Get", func(t *testing.T) {
		close, expect := NewTestHandler(t)
		defer close()
		expect.
			PUT(fmt.Sprintf("%s%s", APIRoute, NotesRoute)).
			WithJSON(&store.Note{
				Name:    "Example note",
				Content: "Hello from example!!",
			}).
			Expect().
			Status(http.StatusOK)
		obj := expect.
			GET(fmt.Sprintf("%s%s/%s", APIRoute, NotesRoute, "Example note")).
			Expect().
			Status(http.StatusOK).
			JSON().
			Object()
		obj.Value("name").String().Equal("Example note")
		obj.Value("content").String().Equal("Hello from example!!")
	})
	t.Run("Update", func(t *testing.T) {
		close, expect := NewTestHandler(t)
		defer close()
		expect.
			PUT(fmt.Sprintf("%s%s", APIRoute, NotesRoute)).
			WithJSON(&store.Note{
				Name:    "Example note",
				Content: "Hello from example!!",
			}).
			Expect().
			Status(http.StatusOK)
		obj := expect.
			GET(fmt.Sprintf("%s%s/%s", APIRoute, NotesRoute, "Example note")).
			Expect().
			Status(http.StatusOK).
			JSON().
			Object()
		obj.Value("name").String().Equal("Example note")
		obj.Value("content").String().Equal("Hello from example!!")
		expect.
			PATCH(fmt.Sprintf("%s%s/%s", APIRoute, NotesRoute, "Example note")).
			WithJSON(&store.Note{
				Content: "New content",
			}).
			Expect().
			Status(http.StatusOK)
		obj = expect.
			GET(fmt.Sprintf("%s%s/%s", APIRoute, NotesRoute, "Example note")).
			Expect().
			Status(http.StatusOK).
			JSON().
			Object()
		obj.Value("name").String().Equal("Example note")
		obj.Value("content").String().Equal("New content")
	})
	t.Run("Delete", func(t *testing.T) {
		close, expect := NewTestHandler(t)
		defer close()
		expect.
			PUT(fmt.Sprintf("%s%s", APIRoute, NotesRoute)).
			WithJSON(&store.Note{
				Name:    "Example note",
				Content: "Hello from example!!",
			}).
			Expect().
			Status(http.StatusOK)
		expect.
			DELETE(fmt.Sprintf("%s%s/%s", APIRoute, NotesRoute, "Example note")).
			WithJSON(&store.Note{
				Name:    "Example note",
				Content: "Hello from example!!",
			}).
			Expect().
			Status(http.StatusOK)
		notes := expect.
			GET(fmt.Sprintf("%s%s", APIRoute, NotesRoute)).
			Expect().
			Status(http.StatusOK).
			JSON().
			Array()
		notes.Length().Equal(0)
	})
}
