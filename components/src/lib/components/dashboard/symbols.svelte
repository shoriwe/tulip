<script lang="ts">
	import SimpleCandles from '../simpleCandles.svelte';

	export let symbols: string[];
</script>

{#key symbols}
	<div class="grid sm:grid-cols-1 md:grid-cols-3">
		{#each symbols as symbol}
			<SimpleCandles {symbol} height="275px" />
		{/each}
	</div>
{/key}
