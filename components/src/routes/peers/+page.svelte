<script lang="ts">
	import { page } from '$app/stores';
	import Peers from '$lib/components/peers.svelte';

	let symbol: string = $page.url.searchParams.get('symbol') || 'AAPL';
	const depthString: string = $page.url.searchParams.get('depth') || '100';
	let depth: number = parseInt(depthString);
</script>

<div style="width: 100%; height: 100%;">
	<Peers bind:symbol bind:depth />
</div>
