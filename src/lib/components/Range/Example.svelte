<script lang="ts">
	import { Range } from './';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Range';
	const description = 'Input range component.';
	const code = `
  `;

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'primary' as ThemeColor
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="flex space-x-12">
		{#key props}
			<Range value="65" {...props} size="xs" />
			<Range value="50" {...props} size="sm" />
			<Range value="25" {...props} size="md" />
			<Range value="36" {...props} size="lg" />
			<Range value="70" {...props} size="xl" />
			<Range value="40" {...props} size="xl2" />
		{/key}
	</div>
	<!-- <input
		type="range"
		value="65"
		class="appearance-none bg-gray-500 h-1 accent-success hover:accent-success-300"
	/> -->
</ExamplePage>
