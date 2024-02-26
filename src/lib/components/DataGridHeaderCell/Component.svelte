<script lang="ts">
	import { getContext } from 'svelte';
	import { type DataGridHeaderCellProps, gridHeaderCellDefaults as defaults } from './module';
	import { themeStore, themer } from '$lib/theme';
	import type {
		DataGridColumnConfig,
		DataGridContext,
		DataGridDataItem
	} from '$lib/components/DataGrid';
	import type { ElementProps } from '$lib/types';

	type Data = $$Generic<DataGridDataItem>;
	type $$Props = DataGridHeaderCellProps<Data> & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { accessor, focused, size, stacked, theme } = {
		...defaults,
		focused: context.globals?.focused,
		size: context.globals?.size,
		stacked: context.globals?.stacked,
		theme: context.globals?.theme
	} as Required<$$Props>;

	$: sortkey = $context?.sort.find((v) => [accessor, '-' + accessor].includes(v));
	$: sortdir = typeof sortkey === 'undefined' ? 0 : sortkey.charAt(0) === '-' ? -1 : 1;

	$: gridHeaderCellClasses = themer($themeStore)
		.create('DataGridHeaderCell')
		.option('gridHeaderPadding', size, size)
		.option('common', 'focusedOutlineWithin', focused)
		.option('outlineFocusWithin', theme, focused)
		.prepend('datagrid-cell datagrid-header-cell', true)
		.append('select-none', true)
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
