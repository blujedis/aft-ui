<script lang="ts">
	import Select from './Select.svelte';
	export let value = 'md';
	export let label = 'Size';
</script>

<Select
	bind:value
	{label}
	items={[
		{ label: 'Unstyled', value: '' },
		{ label: 'Extra Small', value: 'xs' },
		{ label: 'Small', value: 'sm' },
		{ label: 'Medium', value: 'md' },
		{ label: 'Large', value: 'lg' },
		{ label: 'Extra Large', value: 'xl' },
		{ label: '2x Large', value: 'xl2' }
	]}
/>

<!-- <label class="flex flex-col">
	<div class="mb-1 text-sm font-semibold">Size:</div>
	<div>
		<select bind:value class="text-sm">
			<option value="unstyled">None</option>
			<option value="xs">Extra Small</option>
			<option value="sm">Small</option>
			<option value="md">Medium</option>
			<option value="lg">Large</option>
			<option value="xl">Extra Large</option>
			<option value="xl2">2X Large</option>
		</select>
	</div>
</label> -->
