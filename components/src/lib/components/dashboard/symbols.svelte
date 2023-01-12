<script lang="ts">
	import SimpleCandles from '../simpleCandles.svelte';

	export let symbols: string[];
	export let resolution: string;
	export let last: number;
</script>

{#key symbols || resolution || last}
	<div class="grid sm:grid-cols-1 md:grid-cols-3">
		{#each symbols as symbol}
			<SimpleCandles {symbol} bind:resolution bind:last height="275px" />
		{/each}
	</div>
{/key}
