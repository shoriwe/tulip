<script lang="ts">
	import { candles, type Candle } from '$lib/api/client';
	import { calcLast } from '$lib/charts/timestamp';
	import {
		createChart,
		type BarData,
		type CandlestickData,
		type HistogramData,
		type IChartApi,
		type Time
	} from 'lightweight-charts';
	import { onMount } from 'svelte';

	export let upColor: string = 'green';
	export let downColor: string = 'red';
	export let symbol: string;
	export let resolution: string = 'D';
	export let last: number = 31;
	export let from: number = 0;
	export let to: number = 0;

	let chartElement: HTMLDivElement;
	let chart: IChartApi;
	let loaded: boolean = false;

	onMount(async function () {
		if (loaded) {
			return;
		}
		if (last !== 0) {
			const fromTo = calcLast(resolution, last);
			from = fromTo.from;
			to = fromTo.to;
		}
		const cs: Candle[] = await candles(symbol, resolution, from, to);
		const chartOptions = {
			rightPriceScale: {
				// positioning the price scale for the area series
				scaleMargins: {
					top: 0.1,
					bottom: 0.4
				},
				borderVisible: false
			}
		};
		chart = createChart(chartElement, chartOptions);
		const priceSeries = chart.addCandlestickSeries();
		priceSeries.setData(
			cs.map((candle: Candle): CandlestickData => {
				const candleColor: string = candle.open < candle.close ? upColor : downColor;
				let result: CandlestickData = {
					color: candleColor,
					wickColor: candleColor,
					borderColor: 'black',
					open: candle.open,
					close: candle.close,
					low: candle.low,
					high: candle.high,
					time: candle.timestamp as Time
				};
				return result;
			})
		);
		const volumeSeries = chart.addHistogramSeries({
			color: '#26a69a',
			priceFormat: {
				type: 'volume'
			},
			priceScaleId: '', // set as an overlay by setting a blank priceScaleId
			// set the positioning of the volume series
			scaleMargins: {
				top: 0.7, // highest point of the series will be 70% away from the top
				bottom: 0
			}
		});
		volumeSeries.setData(
			cs.map((candle: Candle): HistogramData => {
				const candleColor: string = candle.open < candle.close ? 'green' : 'red';
				let result: HistogramData = {
					color: candleColor,
					value: candle.volume,
					time: candle.timestamp as Time
				};
				return result;
			})
		);
		loaded = true;
	});
</script>

<div class="w-full h-full" bind:this={chartElement} />
