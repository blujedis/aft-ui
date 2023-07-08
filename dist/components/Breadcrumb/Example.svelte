<script>
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import Breadcrumb from '.';
	import DarkMode from '../_Example/DarkMode.svelte';
	const title = 'Breadcrumb';
	const description = 'Simple component for displaying tags, notification counts and more.';
	const code = `
  `;
	let dark = false;
	const props = {
		full: false,
		rounded: 'none',
		shadowed: 'none',
		size: 'md',
		theme: 'default',
		transitioned: false,
		variant: 'filled'
	};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
		<Checkbox label="Transitioned" bind:checked={props.transitioned} />
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

	<DarkMode enabled={dark}>
		<Section>
			{#key props}
				<Breadcrumb generated {...props} />
			{/key}
		</Section>
		<Section>
			{#key props}
				<Breadcrumb generated {...props} variant="unfilled" />
			{/key}
		</Section>
	</DarkMode>
</ExamplePage>
