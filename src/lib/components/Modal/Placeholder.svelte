<script lang="ts">
	export let close: () => void = () => {};
</script>

<div>
	<div class="mt-3 text-center sm:mt-5">
		<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
			Modal Placeholder
		</h3>
		<div class="mt-2">
			<p class="text-sm text-gray-500">
				This is a placeholder Modal in the default slot. Either pass a SvelteComponent to the
				"component" prop or replace this default content.
			</p>
		</div>
	</div>
</div>
<div class="mt-5 sm:mt-6">
	<button
		type="button"
		class="inline-flex w-full justify-center rounded-sm bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
		on:click={() => close()}
	>
		OK
	</button>
</div>
