import { recommendationTrends } from "$lib/api/client";
import type { RecommendationTrends } from "$lib/api/client";
import * as echarts from 'echarts';

export async function recommendationTrendsOption(symbol: string): Promise<any> {
    const trend: RecommendationTrends = await recommendationTrends(symbol);
    const trends: number[] = [trend.buy, trend.strongBuy, trend.hold, trend.sell, trend.strongSell]
    const maxTrend: number = Math.max(...trends);
    let option = {
        title: {
            text: `${symbol} Recommendation Trends`
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: 'Buy', max: maxTrend },
                { name: 'Strong Buy', max: maxTrend },
                { name: 'Hold', max: maxTrend },
                { name: 'Sell', max: maxTrend },
                { name: 'Strong Sell', max: maxTrend },
            ],
            splitArea: {
                areaStyle: {
                    color: ['#c0392b', '#e74c3c', '#f1c40f', '#2ecc71', '#27ae60'],
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 10
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'black'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(211, 253, 250, 0.8)'
                }
            }
        },
        series: [
            {
                name: 'Recommendation trends',
                type: 'radar',
                data: [
                    {
                        value: trends,
                        areaStyle: {
                            color: '#2c3e50'
                        }
                    },
                ]
            }
        ]
    };
    return option;
}