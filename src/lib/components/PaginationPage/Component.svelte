<script lang="ts">
	import type {
		HTMLAnchorAttributes,
		HTMLBaseAttributes,
		HTMLButtonAttributes
	} from 'svelte/elements';
	import type { SelectStoreValue } from '$lib/stores/select';
	import { type PaginationContext, Icon } from '$lib/components';
	import { type PaginationPageProps, paginationPageDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { getContext } from 'svelte';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';

	type Tag = $$Generic<'a' | 'button' | 'span'>;
	type NativeProps = Tag extends 'button'
		? HTMLButtonAttributes
		: Tag extends 'a'
			? HTMLAnchorAttributes
			: HTMLBaseAttributes;
	type $$Props = PaginationPageProps<Tag> & NativeProps;

	const context = getContext('Pagination') as PaginationContext;

	export let { as, focused, hovered, next, previous, rounded, size, theme, transitioned, value, variant } = {
		...defaults,
		focused: context.globals?.focused,
		hovered: context.globals?.hovered,
		rounded: context.globals?.rounded,
		size: context.globals?.size,
		theme: context.globals?.theme,
		transitioned: context.globals?.transitioned,
		variant: context.globals?.variant
	} as Required<PaginationPageProps<Tag>>;

	const th = themer($themeStore);

	$: selected = $context?.page === value;

	$: paginationPageClasses = th
		.create('PaginationPage')
		.bundle(['selectedBgAriaSelected'], { $base: 'aria-selected:text-white dark:aria-selected:text-white' }, theme, variant === 'filled')
		.bundle(['selectedSoftBgAriaSelected'], { $base: 'aria-selected:text-current dark:aria-selected:text-white'}, theme, variant === 'soft')
		.bundle(['selectedBorderAriaSelected'], { 
			$base: 'aria-selected:text-current dark:aria-selected:text-white'

		}, theme, variant === 'flushed')
		.option('common', 'mutedText', true)
		.option('fieldFontSizes', size, size)
		.option('paginationGroupedPadding', size, size && ['filled', 'soft'].includes(variant))
		.option('paginationFlushedPadding', size, size && variant === 'flushed')
		// .option('hovered', variant, theme, hovered)
		.option('common', 'focusedOutlineVisible', focused)
		.option('outlineFocusVisible', theme, focused)
		.option('common', 'transitioned', transitioned)
		.option('panelAccordionBgHover', theme, hovered && ['filled', 'soft'].includes(variant))
		.option('roundeds', boolToMapValue(rounded), rounded && ((previous || next) as boolean))
		.append(
			'relative inline-flex items-center justify-center font-semibold focus:z-20',
			['filled', 'soft'].includes(variant)
		)
		.append(
			'inline-flex items-center border-t-2 border-transparent font-medium border-x-0 border-b-0',
			variant === 'flushed'
		)
		.append('z-10', ['filled', 'soft'].includes(variant) && selected)
		.append('hover:border-frame-300 dark:hover:border-frame-600', variant === 'flushed' && !selected)
		.append('pointer-events-none', value === '...' || selected)
		.append('px-2', (previous || next) as any)
		.append('rounded-r-none', previous as any)
		.append('rounded-l-none', next as any)
		.append($$restProps.class, true)
		.compile();

	$: paginationPageIconClasses = th
		.create('PaginationPageIcon')
		.option('paginationIconSizes', size, size && ((previous || next) as boolean))
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());

	function handleSelect(value: SelectStoreValue) {
		if (previous) context.prev();
		else if (next) context.next();
		else context.goto(value);
	}
</script>

<svelte:element
	this={as}
	role={as === 'a' ? 'link' : 'button'}
	tabindex="-1"
	aria-labelledby=""
	use:forwardedEvents
	{...$$restProps}
	href="#"
	class={paginationPageClasses}
	aria-current={selected ? 'page' : null}
	aria-selected={selected}
	on:click={() => handleSelect(value)}
>
	<slot>
		{#if previous}
			<Icon
				icon={previous === true ? 'mdi:chevron-left' : previous}
				class={paginationPageIconClasses}
			/>
		{:else if next}
			<Icon icon={next === true ? 'mdi:chevron-right' : next} class={paginationPageIconClasses} />
		{:else}
			{value}
		{/if}
	</slot>
</svelte:element>
