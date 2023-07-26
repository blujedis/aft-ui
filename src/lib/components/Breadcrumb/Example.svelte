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
	import Breadcrumb, { type BreadcrumbVariant } from '.';
	import BreadcrumbOption from '../BreadcrumbOption';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';

	const title = 'Breadcrumb';
	const description = 'Component for displaying breadcrumbs as paths.';
	const code = `
  `;

	const props = {
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'frame' as ThemeColor,
		transitioned: false as boolean,
		variant: 'default' as BreadcrumbVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Full" bind:checked={props.full} />
		<Checkbox label="Transitioned" bind:checked={props.transitioned} />
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

	{#key props}
		<Section>
			<Breadcrumb {...props} generate flush />
		</Section>

		<Section>
			<Breadcrumb {...props} variant="filled">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>

		<Section>
			<Breadcrumb {...props} flush>
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>
	{/key}
</ExamplePage>
