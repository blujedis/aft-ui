<script lang="ts">
	import { Checkbox, type CheckboxVariant } from '.';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants/colors';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

	const title = 'Checkboxes';
	const description = 'Themed Checkbox component.';
	const code = `
  `;

	const props = {
		disabled: false,
		full: false,
		rounded: 'md' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		transitioned: false,
		variant: 'outlined' as CheckboxVariant
	};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-8 gap-2">
		{#each colors as color}
			<label for="outlined">
				<Checkbox {...props} theme={color} />
			</label>
		{/each}
	</div>
</ExamplePage>
