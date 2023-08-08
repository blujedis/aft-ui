<script lang="ts">
	import { Kbd, type KbdVariant } from '.';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'KBD';
	const description = 'Themed KBD elements and variants.';
	const code = `
  `;

	const props = {
		full: false,
		rounded: 'md' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean, //  ThemeTransitioned,
		variant: 'filled' as KbdVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	{#each colors as color}
		<div class="grid grid-cols-3 gap-4 mb-4">
			<label for="filled">
				<Kbd {...props} variant="filled" theme={color}>space</Kbd>
			</label>
			<label for="filled">
				<Kbd {...props} variant="outline" theme={color}>cmd + i</Kbd>
			</label>
			<label for="filled">
				<Kbd {...props} variant="glass" theme={color}>ctrl + shift</Kbd>
			</label>
		</div>
	{/each}
</ExamplePage>
