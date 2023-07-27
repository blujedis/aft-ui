<script lang="ts">
	import usePaginator from '$lib/stores/paginator';
	import { type PaginationProps, paginationDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import { get_current_component } from 'svelte/internal';
	import { onMount, setContext } from 'svelte';
	import { cleanObj, forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '../../types';

	type Item = $$Generic<Record<string, any>>;
	type $$Props = PaginationProps<Item> & ElementProps<'nav'>;

	export let {
		ellipsis,
		items,
		page,
		pages,
		pageSize,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant
	} = {
		...defaults
	} as Required<PaginationProps>;

	const store = usePaginator({ items, page, pageSize, pages, ellipsis });

	const globals = cleanObj({
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant
	});

	export const context = setContext('Pagination', {
		...store,
		globals
	});

	const th = themer($themeStore);
	let mounted = false;

	$: paginationControllerClasses = th
		.create('PagerControllerNav')
		.option('common', 'transition', transitioned)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		// [ln] justify-between border-t border-gray-200
		.append('inline-flex items-center', variant === 'flushed')
		// [gp] rounded-md shadow-sm
		.append('isolate inline-flex -space-x-px', variant === 'grouped')
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
	onMount(() => {
		mounted = true;
	});
</script>

<nav
	use:forwardedEvents
	aria-label="Pagination"
	{...$$restProps}
	class={paginationControllerClasses}
	class:invisible={!mounted}
>
	<slot
		page={$context.page}
		startPage={$context.startPage}
		endPage={$context.endPage}
		rangeStart={$context.startRecord}
		rangeEnd={$context.endRecord}
		activePages={$context.activePages}
		totalPages={$context.totalPages}
	/>
</nav>
