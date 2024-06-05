<script lang="ts">
	import { Divider } from '.';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Divider';
	const description = 'Themed Divider component.';
	const code = `
  `;

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		transitioned: false as boolean
	};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="mb-4"></div>
	{/each}
</ExamplePage>
