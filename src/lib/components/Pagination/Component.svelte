<script lang="ts">
	import { getPaginator } from '$lib/stores/paginator';
	import { type PaginationProps, paginationDefaults as defaults } from './module';
	import { themer, themeStore } from '../../theme';
	import { get_current_component } from 'svelte/internal';
	import { setContext } from 'svelte';
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

	const pg = getPaginator({
		page,
		pages,
		pageSize,
		ellipsis,
		items
	});

	const globals = cleanObj({
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant
	});

	export const context = setContext('Pagination', {
		globals
	});

	const th = themer($themeStore);

	$: paginationControllerClasses = th
		.create('PagerControllerNav')
		.option('common', 'transitioned', transitioned)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('inline-flex items-center', ['filled', 'glass'].includes(variant))
		.append('isolate inline-flex -space-x-px', variant === 'filled')
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<nav
	use:forwardedEvents
	aria-label="Pagination"
	{...$$restProps}
	class={paginationControllerClasses}
>
	<slot
		page={pg.page}
		startPage={pg.startPage}
		endPage={pg.endPage}
		rangeStart={pg.startRecord}
		rangeEnd={pg.endRecord}
		activePages={pg.activePages}
		totalPages={pg.totalPages}
	/>
</nav>
