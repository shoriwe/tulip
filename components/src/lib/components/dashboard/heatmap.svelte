<script lang="ts">
	import Heatmap from '../heatmap.svelte';

	export let symbols: string[];
	export let resolution: string;
	export let last: number;
</script>

{#key symbols || resolution || last}
	<Heatmap bind:symbols bind:resolution bind:last />
{/key}
