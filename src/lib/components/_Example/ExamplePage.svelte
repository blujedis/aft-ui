<script lang="ts">
	// import Highlight from 'svelte-highlight';
	// import typescript from 'svelte-highlight/languages/typescript';
	// import github from 'svelte-highlight/styles/github';

	export let title = 'Example';
	export let description = '';
	export let code = '';
	export let visible = false;
	function toggle() {
		visible = !visible;
	}
</script>

<!-- <svelte:head>
	{@html github}
</svelte:head> -->

<div>
	<div class="flex mb-4">
		<div class="flex-1 text-xl font-semibold">
			<a href="/">{title}</a>
		</div>
		<div>
			<div class="rounded-sm p-1 bg-slate-100 ring-slate-700 ring-opacity-10 ring-1">
				<button
					class={'rounded-sm px-4 py-1 border text-sm ' +
						(!visible ? 'bg-white border' : 'border-transparent')}
					on:click={toggle}>Preview</button
				>
				<button
					class={'rounded-sm px-4 py-1 border text-sm ' +
						(visible ? 'bg-white border' : 'border-transparent')}
					on:click={toggle}>Code</button
				>
			</div>
		</div>
	</div>
	<div class="mb-6">
		{#if description}
			<p class="mt-2 mb-4 p-4 bg-slate-100 ring-slate-700 ring-opacity-10 ring-1">{description}</p>
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
