<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Popover, type PopoverVariant } from './';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import { Button } from '..';

	const title = 'Tooltip';
	const description = 'Tooltip component.';

	const props = {
		rounded: 'full' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		hovered: true,
		transitioned: false,
		variant: 'filled' as PopoverVariant
	};
</script>

<ExamplePage {title} {description}>
	<Button>Show Tooltip</Button>
	<Popover class="px-4 py-2 inline-flex">Hello Popover</Popover>
</ExamplePage>
