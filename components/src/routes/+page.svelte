<script lang="ts">
	import Viewer from '$lib/components/editor/viewer.svelte';
	import { onMount } from 'svelte';

	let value: string;

	onMount(async () => {
		const response: Response = await fetch(
			'https://raw.githubusercontent.com/shoriwe/tulip/main/docs/Components.md',
			{ cache: 'force-cache' }
		);
		value = await response.text();
	});
</script>

{#key value}
	{#if value}
		<div class="viewerContainer">
			<div class="viewerSize">
                <Viewer {value} />
            </div>
		</div>
	{/if}
{/key}

<style>
	.viewerContainer {
		display: grid;
		place-items: center;
	}
    .viewerSize {
        padding: 20px;
        max-width: 600px;
    }
</style>
