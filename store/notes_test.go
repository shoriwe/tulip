package store

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStore_Notes(t *testing.T) {
	t.Run("Create", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		cErr := s.CreateNote("Example note", "Hello from example!!")
		assert.Nil(t, cErr)
		note, gErr := s.GetNote("Example note")
		assert.Nil(t, gErr)
		assert.Equal(t, "Example note", note.Name)
		assert.Equal(t, "Hello from example!!", note.Content)
	})
	t.Run("List", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		cErr := s.CreateNote("Example note", "Hello from example!!")
		assert.Nil(t, cErr)
		notes, lErr := s.ListNotes()
		assert.Nil(t, lErr)
		assert.Len(t, notes, 1)
	})
	t.Run("Get", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		cErr := s.CreateNote("Example note", "Hello from example!!")
		assert.Nil(t, cErr)
		note, gErr := s.GetNote("Example note")
		assert.Nil(t, gErr)
		assert.Equal(t, "Example note", note.Name)
		assert.Equal(t, "Hello from example!!", note.Content)
	})
	t.Run("Update", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		cErr := s.CreateNote("Example note", "Hello from example!!")
		assert.Nil(t, cErr)
		cErr = s.CreateNote("Example note 2", "Hello from example!! 2")
		assert.Nil(t, cErr)
		note, gErr := s.GetNote("Example note")
		assert.Nil(t, gErr)
		assert.Equal(t, "Example note", note.Name)
		assert.Equal(t, "Hello from example!!", note.Content)
		uErr := s.UpdateNote("Example note", "New content")
		assert.Nil(t, uErr)
		note, gErr = s.GetNote("Example note")
		assert.Nil(t, gErr)
		assert.Equal(t, "Example note", note.Name)
		assert.Equal(t, "New content", note.Content)
		note, gErr = s.GetNote("Example note 2")
		assert.Nil(t, gErr)
		assert.Equal(t, "Example note 2", note.Name)
		assert.Equal(t, "Hello from example!! 2", note.Content)

	})
	t.Run("Delete", func(t *testing.T) {
		s := NewTestStore()
		defer s.Close()
		cErr := s.CreateNote("Example note", "Hello from example!!")
		assert.Nil(t, cErr)
		note, gErr := s.GetNote("Example note")
		assert.Nil(t, gErr)
		assert.Equal(t, "Example note", note.Name)
		assert.Equal(t, "Hello from example!!", note.Content)
		dErr := s.DeleteNote("Example note")
		assert.Nil(t, dErr)
		notes, lErr := s.ListNotes()
		assert.Nil(t, lErr)
		assert.Len(t, notes, 0)
	})
}
