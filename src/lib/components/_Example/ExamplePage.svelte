<script lang="ts">
	import { ColorMode } from '../ColorMode';
	import { Switch } from '../Switch';
	// import Highlight from 'svelte-highlight';
	// import typescript from 'svelte-highlight/languages/typescript';
	// import github from 'svelte-highlight/styles/github';
	// import githubDark from 'svelte-highlight/styles/github-dark-dimmed';
	// let mode = github;
	export let title = 'Example';
	export let description = '';
</script>

<!-- 
<svelte:head>
	{@html github}
</svelte:head> -->

<ColorMode let:checked let:toggle>
	<Switch {checked} on:change={toggle} shadowed="lg" class="fixed bottom-4 right-6 z-30" />
</ColorMode>

<div class="h-full">
	<div class="text-xl font-semibold mb-4">
		<a href="/">{title}</a>
	</div>
	<div class="mb-6">
		{#if description}
			<p
				class="mt-2 mb-4 p-4 bg-frame-100 ring-frame-950/10 dark:ring-frame-700 dark:bg-frame-900/40 ring-opacity-10 ring-1"
			>
				4
				{description}
			</p>
		{/if}
	</div>
	<slot />
</div>
