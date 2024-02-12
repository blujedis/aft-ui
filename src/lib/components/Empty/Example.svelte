<script lang="ts">
	import { Empty, type EmptyVariant } from '.';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Empty';
	const description = 'New instance empty container.';
	const code = `
  `;

	const props = {
		focused: true,
		full: false,
		hovered: true,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		transitioned: false,
		variant: 'outlined' as EmptyVariant
	};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-4 gap-4">
		{#each colors as color}
			<label for={color}>
				<div class="text-sm">Outlined:</div>
				<Empty {...props} tabindex={0} theme={color}>Empty</Empty>
			</label>
		{/each}
	</div>
</ExamplePage>
