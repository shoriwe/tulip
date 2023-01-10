package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/shoriwe/tulip/store"
)

func (h *Handler) CreateNote(ctx echo.Context) error {
	var note store.Note
	bindErr := ctx.Bind(&note)
	if bindErr != nil {
		return bindErr
	}
	return h.store.CreateNote(note.Name, note.Content)
}

func (h *Handler) ListNotes(ctx echo.Context) error {
	notes, lErr := h.store.ListNotes()
	if lErr != nil {
		return lErr
	}
	return ctx.JSON(http.StatusOK, notes)
}

func (h *Handler) GetNote(ctx echo.Context) error {
	note, gErr := h.store.GetNote(ctx.Param(NameParam))
	if gErr != nil {
		return gErr
	}
	return ctx.JSON(http.StatusOK, note)
}

func (h *Handler) UpdateNote(ctx echo.Context) error {
	var note store.Note
	bindErr := ctx.Bind(&note)
	if bindErr != nil {
		return bindErr
	}
	return h.store.UpdateNote(ctx.Param(NameParam), note.Content)
}

func (h *Handler) DeleteNote(ctx echo.Context) error {
	return h.store.DeleteNote(ctx.Param(NameParam))
}
