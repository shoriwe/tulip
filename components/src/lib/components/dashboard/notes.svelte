<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import Editor from '../editor/editor.svelte';
	let name: string = 'Hello world';
</script>

<Input type="text" placeholder="Note name" required bind:value={name} />
{#key name}
	<Editor bind:name />
{/key}
