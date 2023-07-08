<script>
	import Select from './Select.svelte';
	export let value = '';
</script>

<Select
	bind:value
	label="Rounded"
	items={[
		{ label: 'None', value: 'none' },
		{ label: 'Extra Small', value: 'xs' },
		{ label: 'Small', value: 'sm' },
		{ label: 'Medium', value: 'md' },
		{ label: 'Large', value: 'lg' },
		{ label: 'Extra Large', value: 'xl' },
		{ label: '2x Large', value: 'xl2' },
		{ label: 'Full', value: 'full' }
	]}
/>
