<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Badge, type BadgeVariant } from '.';
	import { colors } from '$lib/constants';
	import type {
		ThemeColor,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize,
		ThemeTransitioned
	} from '$lib/types';

	const title = 'Badges';
	const description = 'Simple component for displaying tags, notification counts and more.';
	const code = `
  `;

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		transitioned: false as ThemeTransitioned,
		variant: 'filled' as BadgeVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	{#each colors as color}
		<div class="grid grid-cols-8 gap-2 mb-4">
			<label for="filled">
				<Badge {...props} theme={color}>React</Badge>
			</label>

			<label for="outlined">
				<Badge {...props} variant="outlined" theme={color}>react</Badge>
			</label>

			<label for="glass">
				<Badge {...props} variant="glass" theme={color}>React</Badge>
			</label>
		</div>
	{/each}
</ExamplePage>
