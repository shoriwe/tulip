//go:build no-components

package components

import (
	"embed"
)

//go:embed build
var Components embed.FS
