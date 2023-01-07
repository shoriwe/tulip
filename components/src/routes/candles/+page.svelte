<script lang="ts">
	import Candles from '$lib/components/candles.svelte';
	import { onMount } from 'svelte';

	let symbol: string;
	let resolution: string;
	let last: number;
	let from: number;
	let to: number;

	let loaded: boolean = false;

	onMount(async () => {
		if (window && window.location && window.location.search) {
			const params: URLSearchParams = new Proxy(new URLSearchParams(window.location.search), {
				get: (searchParams, prop) => searchParams.get(prop)
			});
			symbol = params.symbol || 'AAPL';
			resolution = params.resolution || 'D';
			const lastString: string = params.last || '0';
			last = parseInt(lastString);
			const fromString: string = params.from || '1667278800000';
			from = parseInt(fromString);
			const toString: string = params.to || '1673121379603';
			from = parseInt(toString);

			loaded = true;
		}
	});
</script>

{#key loaded}
	{#if loaded}
		<Candles bind:symbol bind:resolution bind:last bind:from bind:to />
	{/if}
{/key}
