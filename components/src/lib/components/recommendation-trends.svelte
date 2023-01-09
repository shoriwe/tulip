<script lang="ts">
	import { recommendationTrendsOption } from '$lib/charts/recommendation-trends';
	import { onMount } from 'svelte';
	import Chart from './chart.svelte';

	export let symbol: string;

	let option: any;

	onMount(async function () {
		option = await recommendationTrendsOption(symbol);
	});
</script>

<Chart bind:option />