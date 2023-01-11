<script lang="ts">
	import { Viewer } from 'bytemd';
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

	export let value: string;

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
	<Viewer bind:value {plugins} />
</div>

<style>
	:global(.bytemd) {
		height: 100%;
	}
</style>
