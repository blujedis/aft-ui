<script lang="ts">
	import ExamplePage from './ExamplePage.svelte';
	import Section from './Section.svelte';
	import { colors, variantPanel } from '$lib/constants';
	import { themer } from '$lib/theme';
	import { themeStore } from '$lib/theme';

	import classNames from 'classnames';
	import { Flushed } from '../Flushed';
	import { Icon } from '../Icon';

	const title = 'Option/Item Variants';
	const description = 'Page for testing various variants and their themes.';
</script>

<!-- <ExamplePage {title} {description}>
	<div class="grid grid-cols-5 gap-8 items-start">
		<Section>
			<div class="text-2xl font-semibold mb-4">Hovered Panel</div>
			<div class="items-center justify-center">
				<div class={classNames(variantPanel.$base, 'w-full')}>
					{#each colors as color}
						<div
							class={classNames(
								variantPanelItemHover.$base,
								variantPanelItemHover[color],
								'text-sm px-2 py-1.5'
							)}
						>
							{color}
						</div>
					{/each}
				</div>
			</div>
		</Section>

		<Section>
			<div class="text-2xl font-semibold mb-4">Panel Active Filled</div>
			<div class="items-center justify-center">
				<div class={classNames(variantPanel.$base, 'w-full')}>
					{#each colors as color}
						<div
							aria-selected={true}
							class={classNames(
								variantPanelItemHover.$base,
								variantPanelItemHover[color],
								variantItemFilledActive.$base,
								variantItemFilledActive[color],
								'text-sm px-2 py-1.5'
							)}
						>
							{color}
						</div>
					{/each}
				</div>
			</div>
		</Section>

		<Section>
			<div class="text-2xl font-semibold mb-4">Panel Active Glass</div>
			<div class="items-center justify-center">
				<div class={classNames(variantPanel.$base, 'w-full')}>
					{#each colors as color}
						<div
							aria-selected={true}
							class={classNames(
								variantPanelItemHover.$base,
								variantPanelItemHover[color],
								variantItemFilledActive.$base,
								variantItemFilledActive[color],
								'text-sm px-2 py-1.5'
							)}
						>
							{color}
						</div>
					{/each}
				</div>
			</div>
		</Section>

		<Section>
			<div class="text-2xl font-semibold mb-4">Panel Active Ghost</div>
			<div class="items-center justify-center">
				<div class={classNames(variantPanel.$base, 'w-full')}>
					{#each colors as color}
						<div
							aria-selected={true}
							class={classNames(
								variantPanelItemHover.$base,
								variantPanelItemHover[color],
								variantItemFilledActive.$base,
								variantItemFilledActive[color],
								'text-sm px-2 py-1.5'
							)}
						>
							{color}
						</div>
					{/each}
				</div>
			</div>
		</Section>
	</div>
</ExamplePage> -->
