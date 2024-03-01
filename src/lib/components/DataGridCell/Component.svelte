<script lang="ts">
	import { getContext } from 'svelte';
	import { type DataGridCellProps, gridCellDefaults as defaults } from './module';
	import { type DataGridContext } from '$lib/components/DataGrid';
	import { themeStore, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';

	type Data = $$Generic<DataGridDataItem>;
	type $$Props = DataGridCellProps<Data> & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { accessor, full, size, stacked, theme } = {
		...defaults,
		size: context.globals?.size,
		stacked: context.globals?.stacked,
		theme: context.globals?.theme
	} as Required<$$Props>;

	$: gridCellClasses = themer($themeStore)
		.create('DataGridCell')
		.option('fieldPadding', size, size)
		.prepend('datagrid-cell', true)
		.append('col-span-full', full)
		.append('py-0.5', stacked)
		.append($$restProps.class, true)
		.compile();
</script>

<div {...$$restProps} class={gridCellClasses}>
	<slot />
</div>
