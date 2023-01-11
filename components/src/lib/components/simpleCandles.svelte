<script lang="ts">
	import { simpleCandlesOption } from '$lib/charts/candles';
	import { onMount } from 'svelte';
	import Chart from './chart.svelte';

	export let symbol: string;
	export let resolution: string = 'D';
	export let last: number = 31;
	export let height: string = '';

	let option: any;

	onMount(async function () {
		option = await simpleCandlesOption(symbol, resolution, last, 0, 0);
	});
</script>

<Chart bind:option bind:height />
