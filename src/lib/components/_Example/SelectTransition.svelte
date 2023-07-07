<script lang="ts">
	import Select from './Select.svelte';
	export let value = '' as any;
</script>

<Select
	bind:value
	label="Transition"
	items={[
		{ label: 'Announce', value: 'announce' },
		{ label: 'Fade', value: 'fade' },
		{ label: 'Reveal', value: 'reveal' },
		{ label: 'Zoom', value: 'zoom' },
		{ label: 'None', value: 'none' }
	]}
/>
