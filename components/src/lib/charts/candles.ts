import { candles, type Candle } from "$lib/api/client";
import { calcLast, timeFromToFormat } from "./timestamp";

function transformCandles(c: Candle[]): number[][] {
    if (!c) {
        return [];
    }
    let data: number[][] = [];
    for (let index: number = 0; index < c.length; index++) {
        const candle: Candle = c[index];
        data.push(
            [
                candle.timestamp,
                candle.open,
                candle.close,
                candle.low,
                candle.high,
                candle.volume,
                candle.open <= candle.close ? 1 : -1
            ]
        );
    }
    return data;
}

export async function candlesOptions(
    upColor: string, downColor: string,
    symbol: string, resolution: string, last: number, from: number, to: number
): Promise<any> {
    if (last !== 0) {
        const computedInterval: { from: number, to: number } = calcLast(resolution, last);
        from = computedInterval.from;
        to = computedInterval.to;
    }
    const fromToFormat = timeFromToFormat(resolution, from, to);

    new Date(from).toLocaleString()
    const data: any = transformCandles(await candles(symbol, resolution, from, to));
    const option: any = {
        dataset: {
            source: data
        },
        title: {
            text: `${symbol}: ${fromToFormat.from} --> ${fromToFormat.to}`
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            }
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                }
            }
        },
        grid: [
            {
                left: '10%',
                right: '10%',
                bottom: 200
            },
            {
                left: '10%',
                right: '10%',
                height: 80,
                bottom: 80
            }
        ],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                // inverse: true,
                axisLine: { onZero: false },
                splitLine: { show: false },
                min: 'dataMin',
                max: 'dataMax'
            },
            {
                type: 'category',
                gridIndex: 1,
                boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax'
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 10,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                bottom: 10,
                start: 10,
                end: 100
            }
        ],
        visualMap: {
            show: false,
            seriesIndex: 1,
            dimension: 6,
            pieces: [
                {
                    value: 1,
                    color: upColor
                },
                {
                    value: -1,
                    color: downColor
                }
            ]
        },
        series: [
            {
                type: 'candlestick',
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upColor,
                    borderColor0: downColor
                },
                encode: {
                    x: 0,
                    y: [1, 2, 3, 4]
                }
            },
            {
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                itemStyle: {
                    color: '#7fbe9e'
                },
                large: true,
                encode: {
                    x: 0,
                    y: 5
                }
            }
        ]
    };
    return option;
}