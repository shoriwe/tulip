<script lang="ts">
	import { Tabs, TabItem } from 'flowbite-svelte';
	import SymbolPicker from './symbolPicker.svelte';
	import Resume from './resume.svelte';
	import { onMount } from 'svelte';
	import { dashboardStore } from '$lib/stores/dashboard';

	let symbols: string[] = [];
	let loaded: boolean = false;

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
</div>

<Tabs
	style="full"
	defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700"
>
	<TabItem class="w-full" open>
		<span slot="title">Resume</span>
		<Resume bind:symbols />
	</TabItem>
	<TabItem class="w-full">
		<span slot="title">Symbols</span>
		Symbols
	</TabItem>
</Tabs>
