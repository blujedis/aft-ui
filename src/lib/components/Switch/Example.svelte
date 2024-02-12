<script lang="ts">
	import { Switch } from '.';
	import type { ThemeColor, ThemeFocused, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

	const title = 'Switch';
	const description = 'Toggle switch component.';

	let checked = true;

	const props = {
		disabled: false,
		focused: true,
		shadowed: 'none' as ThemeShadowed,
		transitioned: false as boolean // ThemeTransitioned,
	};
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<Switch {...props} bind:checked theme={color} size="md" />
		{/each}
	</div>

	<!-- <div class="grid grid-cols-3 gap-4">
		{#each colors as color}
			<label for={color}>
				<Switch {...props} bind:checked theme={color} />
			</label>
		{/each}
	</div> -->
</ExamplePage>
