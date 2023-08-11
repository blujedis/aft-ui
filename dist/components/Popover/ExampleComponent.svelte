<script>export let close = () => {
};
</script>

<div
	id="popover"
	class="absolute popover text-sm text-white bg-gray-500 px-10 py-4 shadow-md rounded-lg max-w-xs"
>
	<div class="mb-4">Hello I'm a custom element passed to the popover hook.</div>
	<button
		on:click={close}
		class="px-6 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 rounded shadow-sm">Close</button
	>
</div>
