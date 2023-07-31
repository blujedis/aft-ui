<script lang="ts">
	import type { PopoverVariant } from './';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	import popover from '$lib/hooks/usePopover';

	const title = 'Popover';
	const description = 'Uses Popper to position tooltips and popover informational components.';
	const code = `
  `;

	const props = {
		arrowed: true,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		transitioned: false as boolean,
		variant: 'default' as PopoverVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4 p-4">
		<label>
			<div class="text-sm">Default Using Title Attribute:</div>
			<button use:popover={{ action: 'hover' }} title="Hello Tooltip">Tooltip Button</button>
		</label>
	</div>
</ExamplePage>
