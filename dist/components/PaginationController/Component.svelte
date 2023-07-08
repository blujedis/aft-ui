<script>
	import usePaginator from '../../stores/paginator';
	import { paginationControllerDefaults as defaults } from './module';
	import themeStore, { themer } from '../..';
	import { get_current_component, setContext } from 'svelte/internal';
	import { forwardEventsBuilder } from '../../utils';
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
	};
	const store = usePaginator({ items, page, pageSize, pages, ellipsis });
	export const context = setContext('PaginationController', {
		...store,
		globals: {
			rounded,
			shadowed,
			size,
			theme,
			transitioned,
			variant
		}
	});
	const th = themer($themeStore);
	$: paginationControllerClasses = th
		.create('PagerControllerNav')
		.option('common', 'transition', transitioned)
		.remove(transitioned === 'colors' ? 'transition-all' : 'transition-colors', transitioned)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		// [ln] justify-between border-t border-gray-200
		.append('inline-flex items-center', variant === 'flushed')
		// [gp] rounded-md shadow-sm
		.append('isolate inline-flex -space-x-px', variant === 'grouped')
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
		page={$context.page}
		startPage={$context.startPage}
		endPage={$context.endPage}
		rangeStart={$context.startRecord}
		rangeEnd={$context.endRecord}
		activePages={$context.activePages}
		totalPages={$context.totalPages}
	/>
</nav>
