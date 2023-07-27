<script lang="ts">
	import Select from './Select.svelte';
	export let value = 'light';
</script>

<Select
	bind:value
	label="Theme"
	items={[
		// { label: 'Default', value: 'default' },
		{ label: 'Light', value: 'light' },
		{ label: 'Dark', value: 'dark' },
		{ label: 'Primary', value: 'primary' },
		{ label: 'Secondary', value: 'secondary' },
		{ label: 'Tertiary', value: 'tertiary' },
		{ label: 'Danger', value: 'danger' },
		{ label: 'Warning', value: 'warning' },
		{ label: 'Success', value: 'success' },
		{ label: 'Info', value: 'info' }
	]}
/>
