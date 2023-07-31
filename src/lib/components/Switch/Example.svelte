<script lang="ts">
	import Switch, { type SwitchVariant } from '.';
	import type { ThemeColor, ThemeFocused, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Switch';
	const description = 'Toggle switch component.';
	const code = `
  `;

	let checked = true;

	const props = {
		disabled: false,
		focused: 'focusVisible' as ThemeFocused,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'default' as SwitchVariant
	};
</script>

<ExamplePage {title} {description} {code}>

	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Switch {...props} bind:checked />
		</label>
	</div>
</ExamplePage>
