<script lang="ts">
	import { type DataGridHeaderProps, gridHeaderDefaults as defaults } from './module';
	import { themeStore, pickCleanProps, styler, themer } from '$lib';
	import type { ElementProps } from '../../types';
	import type { DataGridContext } from '../DataGrid';
	import { getContext } from 'svelte';

	type $$Props = DataGridHeaderProps & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { autocols, columns, divided, focused, rounded, size, sticky, theme, variant } = {
		...defaults,
		...pickCleanProps(
			context?.globals,
			'autocols',
			'columns',
			'divided',
			'focused',
			'rounded',
			'size',
			'sticky',
			'theme',
			'variant'
		)
	} as Required<$$Props>;

	const st = styler($themeStore);
	const th = themer($themeStore);

	$: gridHeaderStyles = st
		.create('DataGridHeader')
		.add('--template-columns', context.getDataGridTemplate(), autocols)
		.compile();

	$: gridHeaderWrapperClasses = th
		.create('DataGridHeaderWrapper')
		.option('common', 'divided', divided && $$slots.filter)
		.append('divide-y', divided && $$slots.filter)
		// .option('roundeds', rounded, rounded)
		.append('sticky top-0 z-10', sticky) // add overflow-clip & "rounded" to keep top rounding
		.append('rounded-b-none', rounded)
		.prepend('datagrid__header shadow-sm', true)
		.compile(true);

	$: console.log(variant, theme);

	$: gridHeaderClasses = th
		.create('DataGridHeader')
		.variant('gridHeader', variant, theme, variant)
		.append('auto-cols-fr', autocols)
		.prepend('datagrid__header_row grid grid-flow-col w-full', true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div class={gridHeaderWrapperClasses}>
	<div {...$$restProps} class={gridHeaderClasses} style={gridHeaderStyles}>
		<slot />
	</div>
	<slot name="filter" />
</div>

<style>
	.grid__header {
		grid-template-columns: var(--template-columns);
	}
</style>
