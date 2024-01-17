<script lang="ts">
	import { ColorMode } from '../ColorMode';
	import { Switch } from '../Switch';
	// import Highlight from 'svelte-highlight';
	// import typescript from 'svelte-highlight/languages/typescript';
	// import github from 'svelte-highlight/styles/github';
	// import githubDark from 'svelte-highlight/styles/github-dark-dimmed';
	import { beforeUpdate } from 'svelte';

	export let title = 'Example';
	export let description = '';
	export let code = 'Coming soon';
	export let visible = false;

	// let mode = github;

	function switchMode() {
		visible = !visible;
	}
</script>

<!-- 
<svelte:head>
	{@html github}
</svelte:head> -->

<ColorMode let:checked let:toggle>
	<Switch {checked} on:change={toggle} shadowed="lg" class="fixed bottom-4 right-6 z-30" />
</ColorMode>

<div class="h-full">
	<div class="flex mb-4">
		<div class="flex-1 text-xl font-semibold">
			<a href="/">{title}</a>
		</div>
		<div>
			<div
				class="rounded-sm p-1 bg-frame-100 ring-frame-700 dark:bg-frame-800 dark:ring-frame-700 ring-opacity-10 ring-1"
			>
				<button
					class={'rounded-sm px-4 py-1 border border-transparent text-sm ' +
						(visible ? '' : 'bg-white dark:bg-frame-700')}
					on:click={switchMode}>Preview</button
				>
				<button
					class={'rounded-sm px-4 py-1 border border-transparent text-sm ' +
						(visible ? 'bg-white dark:bg-frame-700' : '')}
					on:click={switchMode}>Code</button
				>
			</div>
		</div>
	</div>
	<div class="mb-6">
		{#if description}
			<p
				class="mt-2 mb-4 p-4 bg-frame-100 ring-frame-700 dark:ring-frame-700 dark:bg-frame-800 ring-opacity-10 ring-1"
			>
				{description}
			</p>
		{/if}
	</div>
	<div>
		{#if visible}
			{code}
			<!-- <Highlight language={typescript} {code} class="ring-1 ring-black ring-opacity-5" /> -->
		{:else}
			<slot />
		{/if}
	</div>
</div>
