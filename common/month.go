package common

import (
	"time"
)

func MonthsDiff(from, to time.Time) int {
	fromYear, fromMonth, _ := from.Date()
	toYear, toMonth, _ := to.Date()
	yearDiff := toYear - fromYear
	monthDiff := int(toMonth) - int(fromMonth)
	if monthDiff < 0 {
		yearDiff--
		monthDiff += 12
	}
	return 12*yearDiff + monthDiff
}
