<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Badge, { type BadgeVariant } from '.';
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
		theme: 'light' as ThemeColor,
		transitioned: false as ThemeTransitioned,
		variant: 'default' as BadgeVariant
	};
</script>

<ExamplePage {title} {description} {code}>

	<div class="grid grid-cols-8 gap-2">
		<label for="filled">
			<div class="text-sm">Filled:</div>
			<Badge {...props}>React</Badge>
		</label>
		<label for="outlined">
			<div class="text-sm">Outlined:</div>
			<Badge {...props} variant="outlined">react</Badge>
		</label>
	</div>
</ExamplePage>
