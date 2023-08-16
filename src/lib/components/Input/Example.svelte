<script lang="ts">
	import { Input } from '.';
	import type {
		ThemeColor,
		ThemeFocused,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize
	} from '../../types';
	import { colors } from '$lib/constants';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Input';
	const description = 'Themed input form elements and variants.';
	const code = `
  `;

	const props = {
		disabled: false,
		//focused: true as ThemeFocused,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		transitioned: false as boolean // ThemeTransitioned,
	};
</script>

<ExamplePage {title} {description} {code}>
	{#each colors as color}
		<div class="grid grid-cols-4 gap-4 mb-4">
			<label for="filled">
				<Input {...props} variant="outlined" theme={color} placeholder="First Name" />
			</label>

			<label for="outline">
				<Input {...props} variant="filled" theme={color} placeholder="Last Name" />
			</label>

			<label for="glass">
				<Input {...props} variant="glass" theme={color} placeholder="First Name" />
			</label>

			<label for="link">
				<Input {...props} variant="flushed" theme={color} placeholder="DOB" />
			</label>
		</div>
	{/each}
</ExamplePage>
