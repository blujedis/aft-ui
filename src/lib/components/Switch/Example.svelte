<script lang="ts">
	import { Switch } from '.';
	import type { ThemeColor, ThemeFocused, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

	const title = 'Switch';
	const description = 'Toggle switch component.';
	const code = `
  `;

	let checked = true;

	const props = {
		disabled: false,
		focused: 'focusVisible' as ThemeFocused,
		shadowed: 'none' as ThemeShadowed,
		size: 'lg' as ThemeSize,
		theme: 'dark' as ThemeColor,
		transitioned: false as boolean // ThemeTransitioned,
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<Switch {...props} bind:checked theme="light" size="xs" />
		<Switch {...props} bind:checked theme="light" size="sm" />
		<Switch {...props} bind:checked theme="light" size="md" />
		<Switch {...props} bind:checked theme="light" size="lg" />
		<Switch {...props} bind:checked theme="light" size="xl" />
		<Switch {...props} bind:checked theme="light" size="xl2" />
	</div>

	<!-- <div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<label for={color}>
				<Switch {...props} bind:checked theme={color} />
			</label>
		{/each}
	</div> -->
</ExamplePage>
