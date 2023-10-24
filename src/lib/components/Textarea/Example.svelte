<script lang="ts">
	import { Textarea, type TextareaVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

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
		theme: 'default' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'outlined' as TextareaVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="filled" theme={color} />
		{/each}
	</div>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="ghost" theme={color} />
		{/each}
	</div>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="outlined" theme={color} />
		{/each}
	</div>
</ExamplePage>
