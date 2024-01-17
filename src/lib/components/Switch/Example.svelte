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
		focused: true as ThemeFocused,
		shadowed: 'none' as ThemeShadowed,
		size: 'lg' as ThemeSize,
		theme: 'dark' as ThemeColor,
		transitioned: false as boolean // ThemeTransitioned,
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<Switch {...props} bind:checked theme="default" size="xs" />
		<Switch {...props} bind:checked theme="dark" size="sm" />
		<Switch {...props} bind:checked theme="primary" size="md" />
		<Switch {...props} bind:checked theme="secondary" size="lg" />
		<Switch {...props} bind:checked theme="tertiary" size="xl" />
		<Switch {...props} bind:checked theme="danger" size="xl2" />
		<Switch {...props} bind:checked theme="warning" size="xl2" />
		<Switch {...props} bind:checked theme="success" size="xl2" />
		<Switch {...props} bind:checked theme="info" size="xl2" />
	</div>

	<!-- <div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<label for={color}>
				<Switch {...props} bind:checked theme={color} />
			</label>
		{/each}
	</div> -->
</ExamplePage>
