<script lang="ts">
	import { Loader } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Loader';
	const description = 'HTML themed Loader/spinner element.';
	const code = `
  `;

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		transitioned: false as boolean // ThemeTransitioned,
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">Outlined:</div>
			<Loader {...props} />
		</label>
	</div>
</ExamplePage>
