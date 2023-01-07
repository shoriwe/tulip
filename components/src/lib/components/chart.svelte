<script lang="ts">
	import * as echarts from 'echarts';
	import { onMount, onDestroy } from 'svelte';

	export let option: any;

	let chartDom: HTMLElement;
	let chart: echarts.ECharts;

	let innerWidth: number;
	let innerHeight: number;

	onMount(async function () {
		chartDom.style.width = `${innerWidth - 20}px`;
		chartDom.style.height = `${innerHeight - 20}px`;
		chart = echarts.init(chartDom);
		chart.showLoading();
		window.onresize = function () {
			chart.resize({
				width: innerWidth,
				height: innerHeight
			});
		};
	});

	onDestroy(async function () {
		if (chart) chart.clear();
	});

	$: {
		option;
		if (chart && option) {
			chart.hideLoading();
			chart.setOption(option);
		}
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div bind:this={chartDom} />
