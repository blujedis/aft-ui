<script lang="ts">
	import Label from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants/colors';

	const title = 'Label';
	const description = 'HTML themed form label elements.';
	const code = `
  `;

	const props = {
		hovered: true,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		transitioned: false as boolean // ThemeTransitioned,
	};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-8 gap-4">
		{#each colors as color}
			<Label {...props} theme={color}>Label</Label>
		{/each}
	</div>
</ExamplePage>
