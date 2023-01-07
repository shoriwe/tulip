<script lang="ts">
	import { page } from '$app/stores';
	import Candles from '$lib/components/candles.svelte';

	let symbol: string = $page.url.searchParams.get('symbol') || 'AAPL';
	let resolution: string = $page.url.searchParams.get('resolution') || 'D';
	const lastString: string = $page.url.searchParams.get('last') || '0';
	let last: number = parseInt(lastString);
	const fromString: string = $page.url.searchParams.get('from') || '1667278800000';
	let from: number = parseInt(fromString);
	const toString: string = $page.url.searchParams.get('to') || '1673121379603';
	let to: number = parseInt(toString);
</script>

<Candles bind:symbol bind:resolution bind:last bind:from bind:to />
