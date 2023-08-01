<script lang="ts">
	import Colormode from '../Colormode';
	import Switch from '../Switch';
	// import Highlight from 'svelte-highlight';
	// import typescript from 'svelte-highlight/languages/typescript';
	// import github from 'svelte-highlight/styles/github';

	export let title = 'Example';
	export let description = '';
	export let code = '';
	export let visible = false;

	code = '';
	function toggle() {
		visible = !visible;
	}
</script>

<!-- <svelte:head>
	{@html github}
</svelte:head> -->

<!-- <Colormode let:checked let:toggle let:reset>
	<Switch {checked} on:change={toggle} class="absolute bottom-4 right-6" />
</Colormode> -->

<div>
	<div class="flex mb-4">
		<div class="flex-1 text-xl font-semibold">
			<a href="/">{title}</a>
		</div>
		<div>
			<div
				class="rounded-sm p-1 bg-frame-100 ring-frame-700 dark:bg-frame-900 dark:ring-frame-700 ring-opacity-10 ring-1"
			>
				<button
					class={'rounded-sm px-4 py-1 border border-transparent text-sm ' +
						(visible ? '' : 'bg-white dark:bg-frame-700')}
					on:click={toggle}>Preview</button
				>
				<button
					class={'rounded-sm px-4 py-1 border border-transparent text-sm ' +
						(visible ? 'bg-white dark:bg-frame-700' : '')}
					on:click={toggle}>Code</button
				>
			</div>
		</div>
	</div>
	<div class="mb-6">
		{#if description}
			<p
				class="mt-2 mb-4 p-4 bg-frame-100 ring-frame-700 dark:ring-frame-700 dark:bg-frame-900 ring-opacity-10 ring-1"
			>
				{description}
			</p>
		{/if}
	</div>
	<div>
		{#if visible}
			<span>Todo add syntax highlighting</span>
			<!-- <Highlight language={typescript} {code} /> -->
		{:else}
			<slot />
		{/if}
	</div>
</div>
