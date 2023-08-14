<script lang="ts">
	import { getContext } from 'svelte';
	import { type DataGridCellProps, gridCellDefaults as defaults } from './module';
	import { themeStore, pickCleanProps, themer, type DataGridContext } from '$lib';
	import type { ElementProps } from '../../types';

	type Data = $$Generic<DataGridDataItem>;
	type $$Props = DataGridCellProps<Data> & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { accessor, full, size, stacked, theme, variant } = {
		...defaults,
		...pickCleanProps(context?.globals, 'size', 'stacked', 'theme', 'variant')
	} as Required<$$Props>;

	$: gridCellClasses = themer($themeStore)
		.create('DataGridCell')
		.option('fieldPadding', size, size)
		.prepend('datagrid__cell', true)
		.append('col-span-full', full)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {...$$restProps} class={gridCellClasses}>
	<slot />
</div>
