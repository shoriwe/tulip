package common

import (
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func NewSQLite(file string) *gorm.DB {
	db, err := gorm.Open(sqlite.Open(file))
	if err != nil {
		panic(err)
	}
	return db
}
