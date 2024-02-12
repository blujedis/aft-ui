<script lang="ts">
	import { getContext } from 'svelte';
	import { type DataGridHeaderCellProps, gridHeaderCellDefaults as defaults } from './module';
	import { themeStore, pickCleanProps, themer } from '$lib/theme';
	import type { DataGridContext } from '$lib/components/DataGrid';
	import type { ElementProps } from '$lib/types';

	type Data = $$Generic<DataGridDataItem>;
	type $$Props = DataGridHeaderCellProps<Data> & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	$: sortkey = $context?.sort.find((v) => [accessor, '-' + accessor].includes(v));
	$: sortdir = typeof sortkey === 'undefined' ? 0 : sortkey.charAt(0) === '-' ? -1 : 1;

	export let { accessor, size, stacked, theme, variant } = {
		...defaults,
		size: context.globals?.size,
		stacked: context.globals?.stacked,
		theme: context.globals?.theme,
		variant: context.globals.variant
		// ...pickCleanProps(context?.globals, 'size', 'stacked', 'theme', 'variant')
	} as Required<$$Props>;

	$: gridHeaderCellClasses = themer($themeStore)
		.create('DataGridHeaderCell')
		.option('gridHeaderPadding', size, size)
		.prepend('datagrid__header_cell datagrid__cell', true)
		.append($$restProps.class, true)
		.compile();

	function sort() {
		const key = sortdir === 0 ? accessor : '-' + accessor;
		context.sortby(key);
	}
</script>

<div {...$$restProps} class={gridHeaderCellClasses}>
	<slot {sort} {sortdir} />
</div>
