<script lang="ts">
	import type {
		HTMLAnchorAttributes,
		HTMLBaseAttributes,
		HTMLButtonAttributes
	} from 'svelte/elements';
	import type { SelectStoreValue } from '$lib/stores/select';
	import type { PaginationContext } from '../Pagination';
	import { type PaginationPageProps, paginationPageDefaults as defaults } from './module';
	import { themer, themeStore } from '../../theme';
	import { get_current_component } from 'svelte/internal';
	import { getContext } from 'svelte';
	import { forwardEventsBuilder } from '$lib/utils';
	import { Icon } from '../Icon';

	type Tag = $$Generic<'a' | 'button' | 'span'>;
	type NativeProps = Tag extends 'button'
		? HTMLButtonAttributes
		: Tag extends 'a'
			? HTMLAnchorAttributes
			: HTMLBaseAttributes;
	type $$Props = PaginationPageProps<Tag> & NativeProps;

	const context = getContext('Pagination') as PaginationContext;

	export let { as, focused, next, previous, rounded, size, theme, transitioned, value, variant } = {
		...defaults,
		...context?.globals
	} as Required<PaginationPageProps<Tag>>;

	const th = themer($themeStore);

	$: selected = $context?.page === value;

	$: paginationPageClasses = th
		.create('PaginationPage')
		.variant('paginationPage', variant, theme, true)
		.option('focusedRingVisible', theme, focused)
		.option('fieldFontSizes', size, size)
		.option('paginationGroupedPadding', size, size && ['filled', 'glass'].includes(variant))
		.option('paginationFlushedPadding', size, size && variant === 'flushed')
		.option('common', 'ringed', ['filled', 'glass'].includes(variant))
		.option('roundeds', rounded, rounded && ((previous || next) as boolean))
		.append(
			'relative inline-flex items-center justify-center font-semibold focus:z-20',
			['filled', 'glass'].includes(variant)
		)
		.append(
			'inline-flex items-center border-t-2 font-medium border-x-0 border-b-0',
			variant === 'flushed'
		)
		.append('z-10', ['filled', 'glass'].includes(variant) && selected)
		.append('pointer-events-none', value === '...')
		.append('px-2', (previous || next) as any)
		.append('rounded-r-none', previous as any)
		.append('rounded-l-none', next as any)
		.append($$restProps.class, true)
		.compile(true);

	$: paginationPageIconClasses = th
		.create('PaginationPageIcon')
		.option('paginationIconSizes', size, size && ((previous || next) as boolean))
		.compile(true);

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
