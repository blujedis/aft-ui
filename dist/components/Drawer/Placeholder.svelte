<script>export let close = () => {
};
</script>

<div class="bg-primary-600 px-4 py-6 sm:px-6">
	<div class="flex items-center justify-between">
		<h2 class="text-base font-semibold leading-6 text-white" id="slide-over-title">
			Drawer Placeholder
		</h2>
		<div class="ml-3 flex h-7 items-center">
			<button
				type="button"
				class="rounded-md bg-primary-600 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
				on:click={close}
			>
				<span class="sr-only">Close panel</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	</div>
	<div class="mt-1">
		<p class="text-sm text-primary-200">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit aliquam ad hic recusandae soluta.
		</p>
	</div>
</div>

<div class="px-4 py-6 sm:px-6">
	This placeholder content can be replaced by providing a <code class="bg-gray-100 px-2"
		>content</code
	> component or by replacing the default slot. If you look for a way to style these elements you're
	going to be an unhappy camper! This placeholder is provided so that your initial Drawer has some visual
	content.
</div>
