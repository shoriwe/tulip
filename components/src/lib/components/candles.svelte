<script lang="ts">
	import { candlesOptions } from '$lib/charts/candles';
	import { onMount } from 'svelte';
	import Chart from './chart.svelte';

	export let symbol: string;
	export let resolution: string;
    export let last: number;
    export let from: number;
    export let to: number;

	let option: any;

	onMount(async function () {
		option = await candlesOptions(symbol, resolution, last, from, to);
	});
</script>

<Chart bind:option />