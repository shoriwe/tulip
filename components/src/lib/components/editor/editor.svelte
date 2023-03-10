<script lang="ts">
	import { Editor } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import breaks from '@bytemd/plugin-breaks';
	import frontmatter from '@bytemd/plugin-frontmatter';
	import gemoji from '@bytemd/plugin-gemoji';
	import highlight from '@bytemd/plugin-highlight';
	import math from '@bytemd/plugin-math';
	import mediumZoom from '@bytemd/plugin-medium-zoom';
	import mermaid from '@bytemd/plugin-mermaid';

	import 'bytemd/dist/index.css';
	import 'github-markdown-css';
	import 'highlight.js/styles/vs.css';
	import { onMount } from 'svelte';
	import { createNote, getNote, noteExists, updateNote, type Note } from '$lib/api/client';

	export let name: string;

	let value: string = '';

	onMount(async () => {
		if (await noteExists(name)) {
			const note: Note = await getNote(name);
			value = note.content;
		} else {
			value = '';
			await createNote(name);
		}
	});

	async function handleChange(e: any) {
		value = e.detail.value;
		await updateNote(name, e.detail.value);
	}

	let innerHeight: number;
	let editorContainer: HTMLDivElement;

	function stripPrefixes(obj: Record<string, any>) {
		return Object.entries(obj).reduce((p, [key, value]) => {
			p[key.split('/').slice(-1)[0].replace('.json', '')] = value;
			// console.log(p)
			return p;
		}, {} as Record<string, any>);
	}
	const gfmLocales = stripPrefixes(
		import.meta.glob('/node_modules/@bytemd/plugin-gfm/locales/*.json', {
			eager: true
		})
	);
	const mathLocales = stripPrefixes(
		import.meta.glob('/node_modules/@bytemd/plugin-math/locales/*.json', {
			eager: true
		})
	);
	const mermaidLocales = stripPrefixes(
		import.meta.glob('/node_modules/@bytemd/plugin-mermaid/locales/*.json', {
			eager: true
		})
	);
	let localeKey = 'en';
	const plugins = [
		breaks(),
		frontmatter(),
		gemoji(),
		gfm({
			locale: gfmLocales[localeKey]
		}),
		highlight(),
		math({
			locale: mathLocales[localeKey],
			katexOptions: { output: 'html' } // https://github.com/KaTeX/KaTeX/issues/2796
		}),
		mediumZoom(),
		mermaid({
			locale: mermaidLocales[localeKey]
		})
		// Add more plugins here
	];

	$: {
		if (editorContainer) editorContainer.style.height = `calc(${innerHeight}px - 20px)`;
	}
</script>

<svelte:window bind:innerHeight />

<div bind:this={editorContainer}>
	<Editor bind:value {plugins} on:change={handleChange} />
</div>

<style>
	:global(.bytemd) {
		height: 100%;
	}
</style>
