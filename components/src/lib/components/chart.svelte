<script lang="ts">
	import * as echarts from 'echarts';
	import { onMount, onDestroy } from 'svelte';

	export let option: any;
	export let height: string = '';

	let chartDom: HTMLElement;
	let chart: echarts.ECharts;
	let loaded: boolean = false;

	let innerHeight: number;
	let innerWidth: number;

	onMount(async function () {
		if (height) chartDom.style.height = height;
		if (!height) chartDom.style.height = `${innerHeight}px`;
		chart = echarts.init(chartDom);
		chart.showLoading();
		window.onresize = () => {
			chart.resize();
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

<svelte:window bind:innerWidth bind:innerHeight />
<div bind:this={chartDom} />
