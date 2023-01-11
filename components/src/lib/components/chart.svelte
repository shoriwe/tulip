<script lang="ts">
	import * as echarts from 'echarts';
	import { onMount, onDestroy } from 'svelte';

	export let option: any;

	let chartDom: HTMLElement;
	let chart: echarts.ECharts;

	let innerHeight: number;

	onMount(async function () {
		chartDom.style.height = `${innerHeight - 30}px`;
		chart = echarts.init(chartDom);
		chart.showLoading();
		window.onresize = function () {
			chartDom.style.height = `${innerHeight - 30}px`;
			chart.resize({height: innerHeight - 30});
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

<svelte:window bind:innerHeight />
<div style="width: 100%;">
	<div bind:this={chartDom} />
</div>
