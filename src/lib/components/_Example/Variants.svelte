<script lang="ts">
	import ExamplePage from './ExamplePage.svelte';
	import Section from './Section.svelte';
	import { colors } from '$lib/constants';
	import { themer } from '$lib/theme';
	import { themeStore } from '$lib/theme';
	import {
		variantFilled,
		variantFilledHover,
		variantGhost,
		variantGhostHover,
		variantGlass,
		variantGlassHover,
		variantOutlined,
		variantOutlinedHover
	} from '$lib/constants/base';
	import classNames from 'classnames';
	import { Flushed } from '../Flushed';

	const title = 'Variants';
	const description = 'Page for testing various variants and their themes.';

	// const th = themer($themeStore);

	// $: filledClasses =
	// 	th.create('VariantFilled')
	// 	.mapped(variantFilled, '')
</script>

<ExamplePage {title} {description}>
	<Section>
		<div class="text-2xl font-semibold mb-4">Filled</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<div class={classNames(variantFilled.$base, variantFilled[color], 'p-4 text-center')}>
					{color}
				</div>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Filled Hover</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<div
					class={classNames(variantFilledHover.$base, variantFilledHover[color], 'p-4 text-center')}
				>
					{color}
				</div>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Ringed</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<div class={classNames(variantOutlined.$base, variantOutlined[color], 'p-4 text-center')}>
					{color}
				</div>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Ringed Hover</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<div
					class={classNames(
						variantOutlinedHover.$base,
						variantOutlinedHover[color],
						'p-4 text-center'
					)}
				>
					{color}
				</div>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Glass</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<div class={classNames(variantGlass.$base, variantGlass[color], 'p-4 text-center')}>
					{color}
				</div>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Glass Hover</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<div
					class={classNames(variantGlassHover.$base, variantGlassHover[color], 'p-4 text-center')}
				>
					{color}
				</div>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Ghost</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<div class={classNames(variantGhost.$base, variantGhost[color], 'p-4 text-center')}>
					{color}
				</div>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Ghost Hover</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<div
					class={classNames(variantGhostHover.$base, variantGhostHover[color], 'p-4 text-center')}
				>
					{color}
				</div>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Flushed</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<Flushed theme={color}>
					<div class={classNames('p-4 text-center')}>
						{color}
					</div>
				</Flushed>
			{/each}
		</div>
	</Section>

	<Section>
		<div class="text-2xl font-semibold mb-4">Flushed Hover</div>
		<div class="grid grid-cols-6 gap-2 items-center justify-center">
			{#each colors as color}
				<Flushed theme={color} hover>
					<div class={classNames('p-4 text-center group')}>
						{color}
					</div>
				</Flushed>
			{/each}
		</div>
	</Section>
</ExamplePage>
