<script lang="ts">
	import { Checkbox, type CheckboxVariant } from '.';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import type {
		ThemeColor,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize,
		ThemeTransitioned
	} from '$lib/types';

	const title = 'Checkboxes';
	const description = 'Themed Checkbox component.';
	const code = `
  `;

	const props = {
		disabled: false,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as ThemeTransitioned,
		variant: 'outlined' as CheckboxVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Checkbox {...props} />
		</label>
	</div>
</ExamplePage>
