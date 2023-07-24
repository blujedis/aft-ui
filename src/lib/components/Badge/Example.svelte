<script lang="ts">
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	import SelectRounded from '../_Example/SelectRounded.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import Badge, { type BadgeVariant } from '.';
	import type {
		ThemeColor,
		ThemeRounded,
		ThemeShadowed,
		ThemeSize,
		ThemeTransitioned
	} from '$lib/types';

	const title = 'Badges';
	const description = 'Simple component for displaying tags, notification counts and more.';
	const code = `
  `;

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		transitioned: false as ThemeTransitioned,
		variant: 'default' as BadgeVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class="grid grid-cols-8 gap-2">
		<label for="filled">
			<div class="text-sm">Filled:</div>
			<Badge {...props}>React</Badge>
		</label>
		<label for="outlined">
			<div class="text-sm">Outlined:</div>
			<Badge {...props} variant="outlined">react</Badge>
		</label>
	</div>
</ExamplePage>
