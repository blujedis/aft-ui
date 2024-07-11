<script lang="ts">
	import { Textarea, type TextareaVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
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
		rounded: 'md' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		// theme: 'frame' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'outlined' as TextareaVariant
		// placeholder: 'Enter text here...'
	};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="outlined" theme={color}>Placeholder Text</Textarea>
		{/each}
	</div>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="soft" theme={color}>Placeholder Text</Textarea>
		{/each}
	</div>
	<div class="grid grid-cols-4 gap-4 mb-4">
		{#each colors as color}
			<Textarea {...props} variant="text" theme={color}>Placeholder Text</Textarea>
		{/each}
	</div>
</ExamplePage>
