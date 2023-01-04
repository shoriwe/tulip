package store

import (
	"encoding/binary"
	"unsafe"
)

type RecommendationTrends struct {
	Buy        int64 `json:"buy"`
	StrongBuy  int64 `json:"stringBuy"`
	Sell       int64 `json:"sell"`
	StrongSell int64 `json:"stringSell"`
	Hold       int64 `json:"hold"`
}

func (rt *RecommendationTrends) Bytes() []byte {
	result := make([]byte, 40)
	binary.BigEndian.PutUint64(result[:8], (*(*uint64)(unsafe.Pointer(&rt.Buy))))
	binary.BigEndian.PutUint64(result[8:16], (*(*uint64)(unsafe.Pointer(&rt.StrongBuy))))
	binary.BigEndian.PutUint64(result[16:24], (*(*uint64)(unsafe.Pointer(&rt.Sell))))
	binary.BigEndian.PutUint64(result[24:32], (*(*uint64)(unsafe.Pointer(&rt.StrongSell))))
	binary.BigEndian.PutUint64(result[32:40], (*(*uint64)(unsafe.Pointer(&rt.Hold))))
	return result
}

func (rt *RecommendationTrends) FromBytes(b []byte) {
	buy := binary.BigEndian.Uint64(b[:8])
	strongBuy := binary.BigEndian.Uint64(b[8:16])
	sell := binary.BigEndian.Uint64(b[16:24])
	strongSell := binary.BigEndian.Uint64(b[24:32])
	hold := binary.BigEndian.Uint64(b[32:40])

	rt.Buy = *(*int64)(unsafe.Pointer(&buy))
	rt.StrongBuy = *(*int64)(unsafe.Pointer(&strongBuy))
	rt.Sell = *(*int64)(unsafe.Pointer(&sell))
	rt.StrongSell = *(*int64)(unsafe.Pointer(&strongSell))
	rt.Hold = *(*int64)(unsafe.Pointer(&hold))
}
