<script lang="ts">
	import { Drawer } from '.';
	import type { ThemeColor, ThemeShadowed, ThemeSpeed, ThemeSimpleSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Drawer';
	const description =
		'Component for revealing a drawer which can be used for menus or settings as an example';
	const code = `
  `;

	let drawer: Drawer | undefined;

	const props = {
		position: 'right' as 'left' | 'right',
		shadowed: 'xl' as ThemeShadowed,
		size: 'md' as ThemeSimpleSize,
		speed: 'medium' as ThemeSpeed,
		theme: 'light' as ThemeColor
	};

	function show() {
		drawer?.store?.open();
	}
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4">
		<label for="filled">
			<div class="text-sm">
				Default: <button class="text-primary underline pl-4" on:click={show}>Show Drawer</button>
			</div>
			<Drawer bind:this={drawer} {...props} />
		</label>
	</div>
</ExamplePage>
