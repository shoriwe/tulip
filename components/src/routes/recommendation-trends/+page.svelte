<script lang="ts">
	import RecommendationTrends from '$lib/components/recommendation-trends.svelte';
	import { onMount } from 'svelte';

	let symbol: string;

	let loaded: boolean = false;

	onMount(async () => {
		if (window && window.location && window.location.search) {
			const params: any = new Proxy(new URLSearchParams(window.location.search), {
				get: (searchParams: any, prop: any) => searchParams.get(prop)
			});
			symbol = params.symbol || 'AAPL';

			loaded = true;
		}
	});
</script>

{#key loaded}
	{#if loaded}
		<RecommendationTrends bind:symbol/>
	{/if}
{/key}
