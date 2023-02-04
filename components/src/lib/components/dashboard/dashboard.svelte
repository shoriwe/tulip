<script lang="ts">
	import { Tabs, TabItem, Select, ButtonGroup, InputAddon, NumberInput } from 'flowbite-svelte';
	import SymbolPicker from './symbolPicker.svelte';
	import Notes from './notes.svelte';
	import { onMount } from 'svelte';
	import { dashboardStore } from '$lib/stores/dashboard';
	import Symbols from './symbols.svelte';
	import Heatmap from './heatmap.svelte';
	import { resolutionsOptions } from '$lib/api/client';

	let symbols: string[] = [];
	let loaded: boolean = false;
	let resolution: string = 'D';
	let last: number = 31;

	onMount(async () => {
		symbols = JSON.parse($dashboardStore);
		loaded = true;
	});

	$: {
		if (loaded && symbols) {
			$dashboardStore = JSON.stringify(symbols);
		}
	}
</script>

<div class="p-3">
	<SymbolPicker bind:symbols />
	<Select placeholder="Time resolution" items={resolutionsOptions} bind:value={resolution} />
	<ButtonGroup class="mt-2 w-full" size="lg">
		<InputAddon>Last</InputAddon>
		<NumberInput min={1} bind:value={last} />
	</ButtonGroup>
</div>

<Tabs
	style="full"
	defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
>
	<TabItem class="w-full" open>
		<span slot="title">Notes</span>
		<Notes/>
	</TabItem>
	<TabItem class="w-full">
		<span slot="title">Heatmap</span>
		<Heatmap bind:symbols bind:resolution bind:last />
	</TabItem>
	<TabItem class="w-full">
		<span slot="title">Symbols</span>
		<Symbols bind:symbols bind:resolution bind:last/>
	</TabItem>
</Tabs>
