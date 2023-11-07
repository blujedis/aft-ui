<script lang="ts">
	import {
		type BreadcrumbOptionProps,
		breadcrumbOptionDefaults as defaults,
	} from './module';
	import { themer, themeStore } from '../../theme';
	import type { ElementProps } from '../../types';
	import { Icon } from '../Icon';
	import { getContext, onMount } from 'svelte';
	import type { BreadcrumbContext } from '../Breadcrumb/module';

	type $$Props = BreadcrumbOptionProps & ElementProps<'a'>;

	const context = getContext<BreadcrumbContext>('Breadcrumb');

	export let {
		focused,
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
	let mounted = false;

	$: breadcrumbOptionClasses = th
		.create('BreadcrumbOption')
		.variant('breadcrumbOption', variant, theme, variant)
		.option('textHoverFilled', theme, variant === 'filled') // override for filled items.
		.option('focusedRingVisible', typeof focused === 'string' ? focused : theme, focused)
		.option('common', 'transition', transitioned)
		.option('fieldFontSizes', size, size)
		.option('breadcrumbMargins', size, size)
		.append('aria-selected:pointer-events-none dark:aria-selected:brightness-75', true)

		.append('aria-selected:brightness-90', variant === 'filled')
		.append($$restProps.class, true)
		.compile(true);

	$: breadcrumbOptionWrapperClasses = th
		.create('BreadcrumbOptionWrapper')
		.option('breadcrumbFilledHeight', size, size)
		.append('flex items-center', true)
		.compile(true);

	$: breadcrumbIconClasses = th
		.create('BreadcrumbIcon')
		.option('breadcrumbFilledIconWidth', size, size)
		.append('h-full flex-shrink-0 pointer-events-none', true)
		.compile(true);

	onMount(() => {
		mounted = true;
	});
</script>

<li>
	<div class={breadcrumbOptionWrapperClasses}>
		<slot>
			{#if separator && index !== 0}
				{#if variant !== 'text'}
					<svg
						class:invisible={!mounted}
						class={breadcrumbIconClasses}
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
