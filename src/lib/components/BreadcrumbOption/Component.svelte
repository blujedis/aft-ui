<script lang="ts">
	import { type BreadcrumbOptionProps, breadcrumbOptionDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementNativeProps } from '../types';
	import Icon from '../Icon';
	import { getContext } from 'svelte';
	import type { BreadcrumbContext } from '../Breadcrumb/module';

	type $$Props = BreadcrumbOptionProps & ElementNativeProps<'a'>;

	const context = getContext<BreadcrumbContext>('Breadcrumb');

	export let {
		href,
		index,
		icon,
		label,
		selected,
		separator,
		size,
		sronly,
		theme,
		transitioned,
		variant
	} = {
		...defaults,
		...context?.globals
	} as Required<BreadcrumbOptionProps>;

	const th = themer($themeStore);

	$: breadcrumbOptionListClasses = th
		.create('BreadcrumbListItem')
		.variant('breadcrumbOptionItem', variant, theme, true)
		.compile();

	$: breadcrumbOptionClasses = th
		.create('Breadcrumb')
		.variant('breadcrumbOption', variant, theme, true)
		.option('common', 'transition', transitioned)
		.remove(transitioned === 'colors' ? 'transition-all' : 'transition-colors', transitioned)
		.option('fieldFontSizes', size, size)
		.option('breadcrumbMargins', size, size)
		.append('pointer-events-none', selected)
		.append($$restProps.class, true)
		.compile(true);
</script>

<li>
	<div class="flex items-center">
		<slot>
			{#if separator && index > 0}
				{#if variant === 'filled'}
					<svg
						class="h-full w-6 flex-shrink-0 pointer-events-none"
						viewBox="0 0 24 44"
						preserveAspectRatio="none"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
					</svg>
				{:else}
					<Icon icon={separator} class="flex-shrink-0 pointer-events-none" />
				{/if}
			{/if}
			<a
				{...$$restProps}
				role="tab"
				aria-current={selected ? 'location' : null}
				aria-selected={selected}
				{href}
				class={breadcrumbOptionClasses}
			>
				{#if icon}
					<Icon {icon} class="flex-shrink-0 pointer-events-none" />
				{/if}
				{#if sronly}
					<span class="sr-only">Home</span>
				{:else}
					{label}
				{/if}
			</a>
		</slot>
	</div>
</li>

<style>
	div > a:first-child {
		margin-left: 0;
	}
</style>
