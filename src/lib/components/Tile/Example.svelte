<script lang="ts">
	import Tile, { type TileVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Tile';
	const description = 'Basic tiles that can be used for button or anchor content for navigation.';
	const code = `
  `;

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		// transitioned: false as boolean, // ThemeTransitioned,
		variant: 'default' as TileVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	{#key props}
		<div class="grid grid-cols-3 gap-4">
			<label for="filled">
				<div class="text-sm">Filled:</div>
				<Tile {...props}>My Profile</Tile>
			</label>
			<label for="filled">
				<div class="text-sm">Outlined:</div>
				<Tile {...props} variant="outline">Some content</Tile>
			</label>
		</div>
	{/key}
	<div class="mt-4">
		<label>Using Grid w/ Full</label>
		<div class="grid grid-cols-8 gap-1 h-48">
			<button>
				<Tile {...props} full>Profile</Tile>
			</button>
			<button>
				<Tile {...props} full>Accounting</Tile>
			</button>
			<button>
				<Tile {...props} full>Invoices</Tile>
			</button>
			<button>
				<Tile {...props} full>Quotes</Tile>
			</button>
			<button>
				<Tile {...props} full>Messages</Tile>
			</button>
			<button>
				<Tile {...props} full>Users</Tile>
			</button>
			<button>
				<Tile {...props} full>Settings</Tile>
			</button>
		</div>
	</div>
</ExamplePage>
