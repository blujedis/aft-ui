<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Badge, type BadgeVariant } from '.';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

	const title = 'Badges';
	const description = 'Simple component for displaying tags, notification counts and more.';

	const props = {
		full: false,
		rounded: 'full' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		hovered: true,
		focused: true,
		transitioned: false,
		variant: 'filled' as BadgeVariant
	};
	const _colors = [...colors, 'white', 'black'] as ThemeColor[];
</script>

<ExamplePage {title} {description}>
	{#each _colors as color}
		<div class="grid grid-cols-4 gap-2 mb-4">
			<label for="filled">
				<Badge {...props} theme={color}>Badge</Badge>
			</label>
			<label for="outlined">
				<Badge {...props} variant="outlined" theme={color}>Badge</Badge>
			</label>
			<label for="soft">
				<Badge {...props} variant="soft" theme={color}>Badge</Badge>
			</label>
		</div>
	{/each}
	<!-- <Badge {...props} variant="filled" theme="primary" size="xl2">1</Badge>
	<Badge {...props} variant="filled" theme="primary" rounded="full" size="xl2">1</Badge> -->
</ExamplePage>
