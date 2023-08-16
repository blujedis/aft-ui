<script lang="ts">
	import Section from '../_Example/Section.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { Breadcrumb, type BreadcrumbVariant } from '.';
	import { BreadcrumbOption } from '../BreadcrumbOption';
	import { colors } from '$lib/constants';
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
		theme: 'default' as ThemeColor,
		transitioned: false as boolean,
		variant: 'text' as BreadcrumbVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="mb-4">
		<Breadcrumb {...props} generate flush />
	</div>
	<div class="mb-8 grid grid-cols-2 gap-4">
		{#each colors as color}
			<Breadcrumb {...props} variant="filled" theme={color}>
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush theme={color}>
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		{/each}
	</div>
	<div class="mb-4 grid grid-cols-2 gap-4">
		{#each colors as color}
			<Breadcrumb {...props} variant="glass" theme={color}>
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		{/each}
	</div>
	<!-- <Section>
			<Breadcrumb {...props} generate flush />
		</Section>

		<Section class="flex space-x-12">
			<Breadcrumb {...props} variant="filled">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush>
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>

		<Section class="flex space-x-12">
			<Breadcrumb {...props} variant="filled" theme="dark">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush theme="dark">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>

		<Section class="flex space-x-12">
			<Breadcrumb {...props} variant="filled" theme="primary">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush theme="primary">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>

		<Section class="flex space-x-12">
			<Breadcrumb {...props} variant="filled" theme="secondary">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush theme="secondary">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>

		<Section class="flex space-x-12">
			<Breadcrumb {...props} variant="filled" theme="tertiary">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush theme="tertiary">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>

		<Section class="flex space-x-12">
			<Breadcrumb {...props} variant="filled" theme="danger">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush theme="danger">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>

		<Section class="flex space-x-12">
			<Breadcrumb {...props} variant="filled" theme="warning">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush theme="warning">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>

		<Section class="flex space-x-12">
			<Breadcrumb {...props} variant="filled" theme="success">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush theme="success">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section>

		<Section class="flex space-x-12">
			<Breadcrumb {...props} variant="filled" theme="info">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" selected />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>

			<Breadcrumb {...props} flush theme="info">
				<BreadcrumbOption label="Home" href="/" index={0} />
				<BreadcrumbOption label="Get Started" href="/" />
				<BreadcrumbOption label="Docs" href="/" />
				<BreadcrumbOption label="Contact Us" href="/" selected />
				<BreadcrumbOption label="About" href="/" />
			</Breadcrumb>
		</Section> -->
</ExamplePage>
