package store

import (
	"encoding/binary"
	"time"
	"unsafe"
)

type (
	Candle struct {
		Symbol     string     `json:"symbol,omitempty" gorm:"index:idx_unique_candle,unique"`
		Timestamp  time.Time  `json:"timestamp,omitempty" gorm:"index:idx_unique_candle,unique"`
		Resolution Resolution `json:"resolution,omitempty" gorm:"index:idx_unique_candle,unique"`
		Open       float64    `json:"open" gorm:"index:idx_unique_candle,unique"`
		High       float64    `json:"high" gorm:"index:idx_unique_candle,unique"`
		Low        float64    `json:"low" gorm:"index:idx_unique_candle,unique"`
		Close      float64    `json:"close" gorm:"index:idx_unique_candle,unique"`
		PrevClose  float64    `json:"prevClose,omitempty" gorm:"index:idx_unique_candle,unique"`
		Volume     float64    `json:"volume,omitempty" gorm:"index:idx_unique_candle,unique"`
	}
)

func (candle *Candle) Bytes() []byte {
	if candle.Timestamp.IsZero() {
		candle.Timestamp = time.UnixMilli(time.Now().UnixMilli())
	}
	result := make([]byte, 57, 57+len(candle.Symbol))

	timestamp := candle.Timestamp.UnixNano()
	binary.BigEndian.PutUint64(result[:8], (*(*uint64)(unsafe.Pointer(&timestamp))))
	binary.BigEndian.PutUint64(result[8:16], (*(*uint64)(unsafe.Pointer(&candle.Open))))
	binary.BigEndian.PutUint64(result[16:24], (*(*uint64)(unsafe.Pointer(&candle.High))))
	binary.BigEndian.PutUint64(result[24:32], (*(*uint64)(unsafe.Pointer(&candle.Low))))
	binary.BigEndian.PutUint64(result[32:40], (*(*uint64)(unsafe.Pointer(&candle.Close))))
	binary.BigEndian.PutUint64(result[40:48], (*(*uint64)(unsafe.Pointer(&candle.PrevClose))))
	binary.BigEndian.PutUint64(result[48:56], (*(*uint64)(unsafe.Pointer(&candle.Volume))))
	result[56] = byte(candle.Resolution)
	result = append(result, []byte(candle.Symbol)...)

	return result
}

func (candle *Candle) FromBytes(b []byte) {
	timestamp := binary.BigEndian.Uint64(b[:8])
	open := binary.BigEndian.Uint64(b[8:16])
	high := binary.BigEndian.Uint64(b[16:24])
	low := binary.BigEndian.Uint64(b[24:32])
	close := binary.BigEndian.Uint64(b[32:40])
	prevClose := binary.BigEndian.Uint64(b[40:48])
	volume := binary.BigEndian.Uint64(b[48:56])

	candle.Timestamp = time.Unix(0, *(*int64)(unsafe.Pointer(&timestamp)))
	candle.Open = *(*float64)(unsafe.Pointer(&open))
	candle.High = *(*float64)(unsafe.Pointer(&high))
	candle.Low = *(*float64)(unsafe.Pointer(&low))
	candle.Close = *(*float64)(unsafe.Pointer(&close))
	candle.PrevClose = *(*float64)(unsafe.Pointer(&prevClose))
	candle.Volume = *(*float64)(unsafe.Pointer(&volume))
	candle.Resolution = *(*Resolution)(unsafe.Pointer(&b[56]))
	candle.Symbol = string(b[57:])
}
