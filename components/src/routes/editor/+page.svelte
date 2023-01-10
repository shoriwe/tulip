<script lang="ts">
	import Editor from '$lib/components/editor/editor.svelte';
	import { onMount } from 'svelte';

	let name: string;

	let loaded: boolean = false;

	onMount(async () => {
		if (window && window.location && window.location.search) {
			const params: any = new Proxy(new URLSearchParams(window.location.search), {
				get: (searchParams: any, prop: any) => searchParams.get(prop)
			});
			name = params.name || 'Hello world';

			loaded = true;
		}
	});
</script>

{#key loaded}
	{#if loaded}
		<Editor bind:name/>
	{/if}
{/key}
