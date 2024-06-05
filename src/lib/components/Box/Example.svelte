<script lang="ts">
	import { Box, type BoxVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

	const title = 'Box';
	const description = 'Basic boxes that can be used for button or anchor content for navigation.';

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		// transitioned: false as boolean, // ThemeTransitioned,
		variant: 'filled' as BoxVariant
	};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-5 gap-4 mb-4">
			<Box {...props} theme={color}>My Profile</Box>
			<Box {...props} variant="outlined" theme={color}>Some content</Box>
			<Box {...props} theme={color} variant="soft">Some content</Box>
		</div>
	{/each}
</ExamplePage>
