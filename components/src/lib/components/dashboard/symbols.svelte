<script lang="ts">
	import Candles from '../candles.svelte';

	export let symbols: string[];
</script>

<div class="h-screen ">
	{#each symbols as symbol}
		<div class="h-5/6 ">
			<Candles {symbol} />
		</div>
	{/each}
</div>
