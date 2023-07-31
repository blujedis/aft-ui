<script lang="ts">
	import Textarea, { type TextareaVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Textarea';
	const description = 'Themed textarea input component.';
	const code = `
  `;

	const props = {
		disabled: false,
		focused: true, // true: focus-visible.
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'default' as TextareaVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Textarea {...props} variant="outlined" />
		</label>
		<label for="outline">
			<div class="text-sm">Filled:</div>
			<Textarea {...props} variant="filled" />
		</label>
	</div>
</ExamplePage>
