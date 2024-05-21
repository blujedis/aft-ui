<script>export let title = "Example";
export let description = "";
</script>

<!-- 
<svelte:head>
	{@html github}
</svelte:head> -->

<!-- <ColorMode let:checked let:toggle>
	<Switch {checked} on:change={toggle} shadowed="lg" class="fixed bottom-4 right-6 z-30" />
</ColorMode> -->

<div class="h-full">
	<div class="text-xl font-semibold mb-4">
		<a href="/">{title}</a>
	</div>
	<div class="mb-6">
		{#if description}
			<p
				class="mt-2 mb-4 p-4 bg-frame-50 ring-frame-950/10 dark:bg-frame-900/40 dark:ring-frame-700/80 ring-1"
			>
				{description}
			</p>
		{/if}
	</div>
	<slot />
</div>
