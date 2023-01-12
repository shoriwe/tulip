<script lang="ts">
	import { candlesOptions } from '$lib/charts/candles';
	import { onMount } from 'svelte';
	import Chart from './chart.svelte';

	export let upColor: string = 'green';
	export let downColor: string = 'red';
	export let symbol: string;
	export let resolution: string = 'D';
	export let last: number = 31;
	export let from: number = 0;
	export let to: number = 0;

	let option: any;

	onMount(async function () {
		option = await candlesOptions(upColor, downColor, symbol, resolution, last, from, to);
	});
</script>

<Chart bind:option />
