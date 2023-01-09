<script lang="ts">
	import { heatmapOption } from "$lib/charts/heatmap";
	import { onMount } from "svelte";
	import Chart from "./chart.svelte";


    export let symbols: string[] = [];
    export let resolution: string;
    export let last: number;
    export let from: number;
    export let to: number

    let option: any;

	onMount(async function () {
		option = await heatmapOption(
			symbols, resolution, last, from, to
		);
	});
</script>

<Chart bind:option />