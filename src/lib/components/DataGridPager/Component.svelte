<script lang="ts">
	import { getContext } from 'svelte';
	import { type DataGridPagerProps, gridPagerDefaults as defaults } from './module';
	import {
		themeStore,
		pickCleanProps,
		themer,
		type DataGridContext,
		Pagination,
		PaginationPage
	} from '$lib';
	import type { ElementProps } from '../../types';

	type Data = $$Generic<DataGridDataItem>;
	type Tag = $$Generic<'a' | 'button' | 'span'>;
	type $$Props = DataGridPagerProps<Tag, Data> & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { ellipsis, page, pageSize, pages, size, theme, variant } = {
		...defaults,
		...pickCleanProps(context?.globals, 'size', 'theme', 'variant')
	} as Required<$$Props>;

	$: gridPagerClasses = themer($themeStore)
		.create('DataGridPager')
		.append($$restProps.class, true)
		.compile();
</script>

<Pagination
	{variant}
	items={$context.filtered.length}
	page={1}
	{pageSize}
	{pages}
	{ellipsis}
	{theme}
	class={gridPagerClasses}
	let:activePages
	let:page
	let:totalPages
	let:startPage
	let:endPage
>
	<PaginationPage previous />
	{#each activePages as page}
		<PaginationPage value={page} />
	{/each}
	<PaginationPage next />
</Pagination>
