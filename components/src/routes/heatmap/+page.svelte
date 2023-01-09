<script lang="ts">
	import HeatMap from '$lib/components/heatmap.svelte';
	import { onMount } from 'svelte';

	let symbols: string[];
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
			symbols = (params.symbol || 'AAPL').split(',');
            resolution = params.resolution || 'D';
            const lastString: string = params.last || '0';
			last = parseInt(lastString);
			const fromString: string = params.from || '1667278800000';
			from = parseInt(fromString);
			const toString: string = params.to || '1673121379603';
			to = parseInt(toString);

			loaded = true;
		}
	});
</script>

{#key loaded}
	{#if loaded}
		<HeatMap bind:symbols bind:resolution bind:last bind:from bind:to/>
	{/if}
{/key}
