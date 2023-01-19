package components

import (
	"embed"
)

//go:embed build/* build/_app/*
//go:embed build/_app/immutable
//go:embed build/_app/immutable/modules/pages/*
//go:embed build/_app/immutable/components/pages/_*
//go:embed build/_app/immutable/components/pages/candles/*
//go:embed build/_app/immutable/components/pages/peers/*
//go:embed build/_app/immutable/components/pages/recommendation-trends/*
//go:embed build/_app/immutable/components/pages/heatmap/*
//go:embed build/_app/immutable/components/pages/editor/*
//go:embed build/_app/immutable/components/pages/dashboard/*
//go:embed build/_app/immutable/components/pages/gains/*
//go:embed build/_app/immutable/chunks/*
//go:embed build/_app/immutable/assets/*
var Components embed.FS
