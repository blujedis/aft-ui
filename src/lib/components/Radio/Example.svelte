<script lang="ts">
	import Radio, { type RadioVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Radio';
	const description = 'Themed radio input element.';
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
		variant: 'default' as RadioVariant
	};
</script>

<ExamplePage {title} {description} {code}>

	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Radio {...props} />
		</label>
	</div>
</ExamplePage>
