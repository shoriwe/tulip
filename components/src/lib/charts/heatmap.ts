import { candles, quote, type Candle } from "$lib/api/client"
import { calcLast } from "./timestamp";
import * as echarts from 'echarts';
import { percentageChange } from "./data";

async function heatmapOptionFromTo(symbols: string[], resolution: string, from: number, to: number): Promise<{ [name: string]: number }> {
    let changes: { [name: string]: number } = {};
    for (let index in symbols) {
        const symbol: string = symbols[index];
        const c: Candle[] = await candles(symbol, resolution, from, to);
        const first: number = c[0].close;
        const last: number = c[c.length - 1].close;
        changes[symbol] = percentageChange(first, last);
    }
    return changes;
}

async function heatmapOptionLast(symbols: string[], resolution: string, last: number): Promise<any> {
    const fromTo = calcLast(resolution, last);
    return await heatmapOptionFromTo(symbols, resolution, fromTo.from, fromTo.to)
}

const visualMin: number = -100;
const visualMax: number = 100;
const visualMinBound: number = -40;
const visualMaxBound: number = 40;

function convertData(changesData: any) {
    let min = Infinity;
    let max = -Infinity;
    for (let index: number = 0; index < changesData.length; index++) {
        let node = changesData[index];
        if (node) {
            let value = node.value;
            value[2] < min && (min = value[2]);
            value[2] > max && (max = value[2]);
        }
    }
    for (let index: number = 0; index < changesData.length; index++) {
        let node = changesData[index];
        if (node) {
            let value = node.value;
            // Scale value for visual effect
            if (value[2] > 0) {
                value[3] = echarts.number.linearMap(
                    value[2],
                    [0, max],
                    [visualMaxBound, visualMax],
                    true
                );
            } else if (value[2] < 0) {
                value[3] = echarts.number.linearMap(
                    value[2],
                    [min, 0],
                    [visualMin, visualMinBound],
                    true
                );
            } else {
                value[3] = 0;
            }
            if (!isFinite(value[3])) {
                value[3] = 0;
            }
        }

    }
}

export async function heatmapOption(symbols: string[], resolution: string, last: number, from: number, to: number): Promise<any> {
    let changes: { [name: string]: number } = {};
    if (last === 0) changes = await heatmapOptionFromTo(symbols, resolution, from, to);
    if (last !== 0) changes = await heatmapOptionLast(symbols, resolution, last);
    const changesData: any = Object.keys(changes).map(
        (symbol: string): any => {
            const c: number = changes[symbol] * 100;
            return {
                name: symbol,
                value: [c + 100, c, c],
            }
        }
    );
    convertData(changesData);
    const option: any = {
        tooltip: {
            formatter: function (info: any) {
                return [
                    '<div class="tooltip-title">' +
                    echarts.format.encodeHTML(info.name) +
                    '</div>',
                    `Change: ${info.value[2].toFixed(2)}%`
                ].join('');
            }
        },
        series: [
            {
                name: "ALL",
                type: 'treemap',
                visualMin: visualMin,
                visualMax: visualMax,
                visualDimension: 3,
                roam: false,
                itemStyle: {
                    borderColor: 'black'
                },
                label: {
                    show: true,
                    formatter: '{b}',
                    textStyle: {
                        color: 'white',
                        fontWeight: 'bolder'
                    }
                },
                levels: [
                    {
                        itemStyle: {
                            borderWidth: 3,
                            borderColor: '#333',
                            gapWidth: 3
                        },
                        color: [
                            '#C30010',
                            '#D1001F',
                            '#DE0A26',
                            '#F01E2C',
                            '#FF2C2C',
                            '#F94449',
                            '#EE6B6E',
                            '#B9E3DA',
                            '#A2D9CE',
                            '#8BD0C2',
                            '#73C6B6',
                            '#5CBDAA',
                            '#45B39D',
                            '#2DAA91',
                        ],
                        colorMappingBy: 'value',
                    },
                ],
                data: changesData
            }
        ]
    };

    return option;
} 