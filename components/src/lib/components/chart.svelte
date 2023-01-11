<script lang="ts">
	import * as echarts from 'echarts';
	import { onMount, onDestroy } from 'svelte';

	export let option: any;

	let chartDom: HTMLElement;
	let chart: echarts.ECharts;
	let loaded: boolean = false;

	let innerHeight: number;

	onMount(async function () {
		chart = echarts.init(chartDom);
		chart.showLoading();
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
		if (loaded && innerHeight) {
			chartDom.style.height = `${innerHeight - 30}px`;
			chart.resize({ height: innerHeight - 30 });
		}
	}
</script>

<svelte:window bind:innerHeight />
<div bind:this={chartDom} />
