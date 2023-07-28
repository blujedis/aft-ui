<script lang="ts">
	import Input, { type InputVariant } from '.';
	import type {
		ThemeColor,
		ThemeFocused,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize
	} from '../../types';
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';

	const title = 'Input';
	const description = 'Themed input form elements and variants.';
	const code = `
  `;

	const props = {
		disabled: false,
		//focused: true as ThemeFocused,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'default' as InputVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
		<Checkbox label="Disabled" bind:checked={props.disabled} />
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

	<div class="grid grid-cols-3 gap-0">
		<!-- <label for="filled">
			<div class="text-sm">Outlined:</div>
			<div class="flex">
				<Input {...props} variant="outlined" placeholder="First Name" />
			</div>
		</label>
		<label for="outline">
			<div class="text-sm">Filled:</div>
			<Input {...props} variant="filled" placeholder="Last Name" />
		</label> -->
		<label for="link">
			<div class="text-sm">Flushed:</div>
			<Input {...props} variant="flushed" />
		</label>
	</div>
</ExamplePage>
