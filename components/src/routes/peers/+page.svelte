<script lang="ts">
	import Peers from '$lib/components/peers.svelte';
	import { onMount } from 'svelte';

	let symbol: string;
	let depth: number;

	let loaded: boolean = false;

	onMount(async () => {
		if (window && window.location && window.location.search) {
			const params: any = new Proxy(new URLSearchParams(window.location.search), {
				get: (searchParams: any, prop: any) => searchParams.get(prop)
			});
			symbol = params.symbol || 'AAPL';
			const depthString: string = params.depth || '100';
			depth = parseInt(depthString);

			loaded = true;
		}
	});
</script>

{#key loaded}
	{#if loaded}
		<Peers bind:symbol bind:depth />
	{/if}
{/key}
