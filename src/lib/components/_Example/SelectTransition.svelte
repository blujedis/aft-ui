<script lang="ts">
	import Select from './Select.svelte';
	export let value = '' as any;
</script>

<Select
	bind:value
	label="Transition"
	items={[
		{ label: 'None', value: 'none' },
		{ label: 'Disoslve', value: 'dissolve' },
		{ label: 'Focus', value: 'focus' },
		{ label: 'Expand', value: 'expand' },
		{ label: 'Swipe', value: 'swipe' },
		{ label: 'Zoom', value: 'zoom' },
		{ label: 'Announce', value: 'announce' },
		{ label: 'Reveal', value: 'reveal' }
	]}
/>
