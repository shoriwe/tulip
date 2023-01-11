<script lang="ts">
	import { resolutionsOptions, symbolsToNoteName } from '$lib/api/client';
	import { ButtonGroup, NumberInput, InputAddon, Select } from 'flowbite-svelte';

	export let symbols: string[];
    let name: string;

	import Editor from '../editor/editor.svelte';
	import Heatmap from '../heatmap.svelte';

	let resolution: string = 'D';
	let last: number = 365;

    $ : {
        symbols;
        name = symbolsToNoteName(symbols)
    }
</script>

<Select placeholder="Time resolution" items={resolutionsOptions} bind:value={resolution} />
<ButtonGroup class="mt-2 w-full" size="lg">
	<InputAddon>Last</InputAddon>
	<NumberInput min={1} bind:value={last} />
</ButtonGroup>
<div class="mt-2 grid sm:grid-cols-1 md:grid-cols-2">
	{#key symbols}
		<Editor bind:name />
		<div>
			{#key symbols || resolution || last}
				<Heatmap bind:symbols bind:resolution bind:last from={0} to={0} />
			{/key}
		</div>
	{/key}
</div>
