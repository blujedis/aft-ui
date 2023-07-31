<script lang="ts">
	import Input, { type InputVariant } from '.';
	import type {
		ThemeColor,
		ThemeFocused,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize
	} from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

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

	<div class="grid grid-cols-3 gap-0">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<div class="flex">
				<Input {...props} variant="outlined" placeholder="First Name" />
			</div>
		</label>
		<label for="outline">
			<div class="text-sm">Filled:</div>
			<Input {...props} variant="filled" placeholder="Last Name" />
		</label>
		<label for="link">
			<div class="text-sm">Flushed:</div>
			<Input {...props} variant="flushed" />
		</label>
	</div>
</ExamplePage>
