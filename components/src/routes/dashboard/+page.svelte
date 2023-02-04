<script lang="ts">
	import Dashboard from '$lib/components/dashboard/dashboard.svelte';
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

<Dashboard bind:name />
