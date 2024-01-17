<script lang="ts">
	import { Button, type ButtonVariant } from '.';
	import type { ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import { colors } from '$lib/constants';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Flushed } from '../Flushed';

	const title = 'Buttons';
	const description = 'Themed Buttons with variants.';
	const code = `
  `;

	const props = {
		disabled: false,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		variant: 'filled' as ButtonVariant,
		underlined: false,
		hoverable: true,
		focused: true
	};

	const background = 'url("https://i.imgur.com/DdrZVb7.gif") center center / cover no-repeat';
</script>

<ExamplePage {title} {description} {code}>
	{#each colors as color}
		<div class="grid grid-cols-5 gap-4 mb-4">
			<label for="filled">
				<Button {...props} theme={color}>button</Button>
			</label>
			<label for="outline">
				<Button {...props} variant="outlined" theme={color}>button</Button>
			</label>
			<label for="link">
				<Button {...props} variant="text" theme={color}>button</Button>
			</label>
			<label for="ghost">
				<Button {...props} variant="ghost" theme={color}>button</Button>
			</label>
		</div>
	{/each}
</ExamplePage>
