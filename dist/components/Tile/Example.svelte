<script>
	import Tile from '.';
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	const title = 'Tile';
	const description = 'Simple themeed tile components.';
	const code = `
  `;
	const props = {
		focused: true,
		full: false,
		rounded: 'none',
		shadowed: 'none',
		size: 'md',
		theme: 'default',
		transitioned: false,
		variant: 'default'
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

	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Tile {...props} />
		</label>
	</div>
</ExamplePage>
