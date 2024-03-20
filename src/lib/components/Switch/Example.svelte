<script lang="ts">
	import { Switch, Label } from '$lib/components';
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
			<Label tabindex={-1}>
				<Switch {...props} bind:checked theme={color} size="md" />
			</Label>
		{/each}
	</div>

	<Label>
		<Switch {...props} bind:checked theme="primary" size="md" />
	</Label>
</ExamplePage>
