<script lang="ts">
	import Editor from '../editor/editor.svelte';
	import { symbolsToNoteName } from '$lib/api/client';
	import { onMount } from 'svelte';

	export let symbols: string[];

	let name: string;

	onMount(async () => {
		name = symbolsToNoteName(symbols);
	});

	$: {
		symbols;
		name = symbolsToNoteName(symbols);
	}
</script>

<Editor bind:name />
