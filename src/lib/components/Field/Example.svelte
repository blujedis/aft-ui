<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Field, type FieldVariant } from '.';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

	const title = 'Fields';
	const description = 'A wrapper container for form fields to display help/error messages.';

	const props = {
		full: false,
		rounded: 'full' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		hovered: true,
		focused: true,
		transitioned: false,
		variant: 'filled' as FieldVariant
	};
	const _colors = [...colors, 'white', 'black'] as ThemeColor[];
</script>

<ExamplePage {title} {description}>
	{#each _colors as color}
		<div class="grid grid-cols-4 gap-2 mb-4">
			<Field {...props} theme={color}>Badge</Field>
			<Field {...props} variant="soft" theme={color}>Badge</Field>
		</div>
	{/each}
</ExamplePage>
