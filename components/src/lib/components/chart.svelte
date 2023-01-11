<script lang="ts">
	import * as echarts from 'echarts';
	import { onMount, onDestroy } from 'svelte';

	export let option: any;

	let chartDom: HTMLElement;
	let chart: echarts.ECharts;
	let loaded: boolean = false;

	let innerHeight: number;

	onMount(async function () {
		chartDom.style.height = `${innerHeight - 30}px`;
		chart = echarts.init(chartDom);
		chart.showLoading();
		window.onresize = function () {
			chartDom.style.height = `${innerHeight - 30}px`;
			chart.resize({ height: innerHeight - 30 });
		};
	});

	onDestroy(async function () {
		if (chart) chart.clear();
	});

	$: {
		option;
		if (!loaded && chart && option) {
			chart.hideLoading();
			chart.setOption(option);
			loaded = true;
		}
	}
</script>

<svelte:window bind:innerHeight />
<div bind:this={chartDom} />
