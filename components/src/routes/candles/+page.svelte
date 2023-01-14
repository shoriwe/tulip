<script lang="ts">
	import Candles from '$lib/components/candles.svelte';
	import { onMount } from 'svelte';

	let upColor: string;
	let downColor: string;
	let symbol: string;
	let resolution: string;
	let last: number;
	let from: number;
	let to: number;

	let loaded: boolean = false;

	onMount(async () => {
		if (window && window.location && window.location.search) {
			const params: any = new Proxy(new URLSearchParams(window.location.search), {
				get: (searchParams: any, prop: any) => searchParams.get(prop)
			});
			upColor = params.upColor || 'green';
			downColor = params.downColor || 'red';
			symbol = params.symbol || 'AAPL';
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

<div class="w-screen h-screen">
	{#key loaded}
		{#if loaded}
			<Candles
				bind:upColor
				bind:downColor
				bind:symbol
				bind:resolution
				bind:last
				bind:from
				bind:to
			/>
		{/if}
	{/key}
</div>
