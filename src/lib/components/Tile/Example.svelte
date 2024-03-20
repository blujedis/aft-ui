<script lang="ts">
	import { Tile, type TileVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

	const title = 'Tile';
	const description = 'Basic tiles that can be used for button or anchor content for navigation.';

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		// transitioned: false as boolean, // ThemeTransitioned,
		variant: 'filled' as TileVariant
	};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-5 gap-4 mb-4">
			<Tile {...props} theme={color}>My Profile</Tile>
			<Tile {...props} variant="outlined" theme={color}>Some content</Tile>
			<Tile {...props} theme={color} variant="soft">Some content</Tile>
		</div>
	{/each}
</ExamplePage>
