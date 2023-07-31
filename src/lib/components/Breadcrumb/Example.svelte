<script lang="ts">
	import Section from '../_Example/Section.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
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
		theme: 'light' as ThemeColor,
		transitioned: false as boolean,
		variant: 'default' as BreadcrumbVariant
	};
</script>

<ExamplePage {title} {description} {code}>

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
