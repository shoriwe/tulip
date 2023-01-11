<script lang="ts">
	import { heatmapOption } from '$lib/charts/heatmap';
	import { onMount } from 'svelte';
	import Chart from './chart.svelte';

	export let symbols: string[] = [];
	export let resolution: string = 'D';
	export let last: number = 31;
	export let from: number = 0;
	export let to: number = 0;

	let option: any;

	onMount(async function () {
		option = await heatmapOption(symbols, resolution, last, from, to);
	});
</script>

<Chart bind:option />
