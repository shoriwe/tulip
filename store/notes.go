package store

type Note struct {
	Name    string `gorm:"primarykey" json:"name"`
	Content string `json:"content"`
}

func (s *Store) CreateNote(name, content string) error {
	return s.db.Create(&Note{Name: name, Content: content}).Error
}

func (s *Store) ListNotes() ([]*Note, error) {
	var notes []*Note
	err := s.db.Find(&notes).Error
	return notes, err
}

func (s *Store) GetNote(name string) (*Note, error) {
	note := new(Note)
	err := s.db.First(note, "name = ?", name).Error
	return note, err
}

func (s *Store) UpdateNote(name, content string) error {
	return s.db.Updates(&Note{Name: name, Content: content}).Error
}

func (s *Store) DeleteNote(name string) error {
	return s.db.Delete(&Note{Name: name}).Error
}
