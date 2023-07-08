<script>
	import Range from './';
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	const title = 'Range';
	const description = 'Input range with themes.';
	const code = `
  `;
	const props = {
		full: false,
		rounded: 'none',
		shadowed: 'none',
		size: 'md',
		theme: 'default'
	};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class="flex space-x-12">
		{#key props}
			<Range value="65" {...props} size="xs" />
			<Range value="50" {...props} size="sm" />
			<Range value="25" {...props} size="md" />
			<Range value="36" {...props} size="lg" />
			<Range value="70" {...props} size="xl" />
			<Range value="40" {...props} size="xl2" />
		{/key}
	</div>
	<!-- <input
		type="range"
		value="65"
		class="appearance-none bg-gray-500 h-1 accent-success hover:accent-success-300"
	/> -->
</ExamplePage>
