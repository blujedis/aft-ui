<script lang="ts">
	import { Switch } from '.';
	import type { ThemeColor, ThemeFocused, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

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
		theme: 'dark' as ThemeColor,
		transitioned: false as boolean // ThemeTransitioned,
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<label for={color}>
				<Switch {...props} bind:checked theme={color} />
			</label>
		{/each}
	</div>
</ExamplePage>
