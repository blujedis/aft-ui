<script lang="ts">
	import { Tile, type TileVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

	const title = 'Tile';
	const description = 'Basic tiles that can be used for button or anchor content for navigation.';

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		// transitioned: false as boolean, // ThemeTransitioned,
		variant: 'filled' as TileVariant
	};
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-4 gap-4 mb-4">
			<label for="filled">
				<Tile {...props} theme={color}>My Profile</Tile>
			</label>
			<label for="filled">
				<Tile {...props} variant="outlined" theme={color}>Some content</Tile>
			</label>
			<label for="filled">
				<Tile {...props} theme={color} variant="soft">Some content</Tile>
			</label>
		</div>
	{/each}

	<!-- <div class="mt-4">
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
	</div> -->
</ExamplePage>
