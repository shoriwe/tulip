<script lang="ts">
	import SimpleCandles from '../simpleCandles.svelte';

	export let symbols: string[];
	export let resolution: string;
	export let last: number;
</script>

{#key symbols || resolution || last}
	<div class="grid sm:grid-cols-1 md:grid-cols-3">
		{#each symbols as symbol}
			<div class="chart-preview">
				<SimpleCandles {symbol} bind:resolution bind:last height="275px" />
			</div>
		{/each}
	</div>
{/key}

<style>
	.chart-preview {
		padding: 5px;
		transition: scale 0.5s;
		margin: 5px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
	}

	.chart-preview:hover {
		scale: 1.01;
	}
</style>
