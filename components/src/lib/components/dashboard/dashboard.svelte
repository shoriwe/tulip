<script lang="ts">
	import { resolutions } from '$lib/api/client';
	import { Tabs, TabItem, ButtonGroup, NumberInput, InputAddon, Select } from 'flowbite-svelte';
	import type { SelectOptionType } from 'flowbite-svelte/types';
	import Candles from '../candles.svelte';
	import Editor from '../editor/editor.svelte';
	import Heatmap from '../heatmap.svelte';
	import SymbolPicker from './symbolPicker.svelte';

	let symbols: string[] = ['AAPL', 'MSFT', 'NET', 'SNOW', 'PLTR'];
	let noteName: string;
	let resolution: string = 'D';
	let last: number = 365;

	function dashboardNoteName(): string {
		const sortedSymbols: string[] = symbols.sort();
		return 'dashboard-' + sortedSymbols.join('-');
	}

	const resolutionsOptions: SelectOptionType[] = [
		...resolutions.map((r: string): SelectOptionType => {
			return { value: r, name: r };
		})
	];

	$: {
		symbols;
		noteName = dashboardNoteName();
	}
</script>

<Tabs
	style="full"
	defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
>
	<TabItem class="w-full" open>
		<span slot="title">Resume</span>
		
			<SymbolPicker bind:symbols />
			<Select
				class="mt-2"
				placeholder="Time resolution"
				items={resolutionsOptions}
				bind:value={resolution}
			/>
			<ButtonGroup class="mt-2 w-full" size="lg">
				<InputAddon>Last</InputAddon>
				<NumberInput min={1} bind:value={last} />
			</ButtonGroup>
            <div class="mt-2 grid sm:grid-cols-1 md:grid-cols-2">
			{#key symbols}
				<Editor bind:name={noteName} />
				<div>
					{#key symbols || resolution || last}
						<Heatmap bind:symbols bind:resolution bind:last from={0} to={0} />
					{/key}
				</div>
			{/key}
		</div>
	</TabItem>
	<TabItem class="w-full">
		<span slot="title">Symbols</span>
		Symbols
	</TabItem>
</Tabs>
