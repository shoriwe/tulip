import { candles, type Candle } from "$lib/api/client";
import * as echarts from 'echarts';

function getSign(data: number[][], dataIndex: number, openVal: number, closeVal: number, closeDimIdx: number): number {
    var sign;
    if (openVal > closeVal) {
        sign = -1;
    } else if (openVal < closeVal) {
        sign = 1;
    } else {
        sign =
            dataIndex > 0
                ? // If close === open, compare with close of last record
                data[dataIndex - 1][closeDimIdx] <= closeVal
                    ? 1
                    : -1
                : // No record of previous, set to be positive
                1;
    }
    return sign;
}

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
                getSign(data, index, candle.open, candle.close, 4) // sign
            ]
        );
    }
    return data;
}

export async function candlesOptions(symbol: string, resolution: string, last: number, from: number, to: number): Promise<any> {
    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';
    if (last !== 0) {
        from = to = Date.now();
        switch (resolution) {
            case '1':
                from -= last * 60000
                break;
            case '60':
                from -= last * 3600000
                break;
            case 'D':
                from -= last * 86400000
                break;
            case 'M':
                from -= last * 2678400000
                break;
            default:
                break;
        }
    }
    let fromDString: string = "";
    let toDString: string = "";
    switch (resolution) {
        case '1':
        case '60':
            fromDString = new Date(from).toLocaleString();
            toDString = new Date(to).toLocaleString();
            break;
        case 'D':
        case 'M':
            fromDString = new Date(from).toLocaleDateString();
            toDString = new Date(to).toLocaleDateString();
            break;
        default:
            break;
    }
    new Date(from).toLocaleString()
    const data: any = transformCandles(await candles(symbol, resolution, from, to));
    const option: any = {
        dataset: {
            source: data
        },
        title: {
            text: `${symbol}: ${fromDString} --> ${toDString}`
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
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor
                },
                encode: {
                    x: 0,
                    y: [1, 4, 3, 2]
                }
            },
            {
                name: 'Volumn',
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