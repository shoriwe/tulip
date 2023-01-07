<script lang="ts">
	import { peersOptions } from '$lib/charts/peers';
	import { onMount } from 'svelte';
	import Chart from './chart.svelte';

	export let symbol: string;
	export let depth: number;

	let option: any;

	onMount(async function () {
		option = await peersOptions(symbol, depth);
	});
</script>

<Chart bind:option />
