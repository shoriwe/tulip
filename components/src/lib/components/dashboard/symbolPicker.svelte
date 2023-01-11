<script lang="ts">
	import Tags from 'svelte-tags-input';

	export let symbols: string[];
</script>

<Tags bind:tags={symbols}/>
