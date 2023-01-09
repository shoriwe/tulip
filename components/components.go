package components

import (
	"embed"
)

//go:embed build/* build/_app/*
//go:embed build/_app/immutable
//go:embed build/_app/immutable/modules/pages/*
//go:embed build/_app/immutable/components/pages/candles/*
//go:embed build/_app/immutable/components/pages/peers/*
//go:embed build/_app/immutable/components/pages/recommendation-trends/*
//go:embed build/_app/immutable/chunks/*
var Components embed.FS
