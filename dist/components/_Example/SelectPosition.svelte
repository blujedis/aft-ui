<script>
	import Select from './Select.svelte';
	export let value = 'md';
</script>

<Select
	bind:value
	label="Size"
	items={[
		{ label: 'Top Right', value: 'top-right' },
		{ label: 'Bottom Right', value: 'bottom-right' },
		{ label: 'Top Left', value: 'top-left' },
		{ label: 'Bottom Left', value: 'bottom-left' },
		{ label: 'Top Center', value: 'top-center' },
		{ label: 'Bottom Center', value: 'bottom-center' }
	]}
/>
