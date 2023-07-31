<script lang="ts">
	import Empty, { type EmptyVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Empty';
	const description = 'New instance empty container.';
	const code = `
  `;

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean, // ThemeTransitioned,
		variant: 'default' as EmptyVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Empty>Empty</Empty>
		</label>
	</div>
</ExamplePage>
