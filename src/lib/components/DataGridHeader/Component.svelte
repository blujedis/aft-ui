<script lang="ts">
	import { type DataGridHeaderProps, gridHeaderDefaults as defaults } from './module';
	import { themeStore, pickCleanProps, styler, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import type { DataGridContext } from '$lib/components/DataGrid';
	import { getContext } from 'svelte';

	type $$Props = DataGridHeaderProps & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { autocols, columns, divided, focused, rounded, size, sticky, theme, variant } = {
		...defaults,
		autocols: context.globals?.autocols,
		columns: context.globals?.columns,
		divided: context.globals?.divided,
		focused: context.globals?.focused,
		rounded: context.globals?.rounded,
		size: context.globals?.size,
		sticky: context.globals?.sticky,
		theme: context.globals?.theme,
		variant: context.globals.variant
		// ...pickCleanProps(
		// 	context?.globals,
		// 	'autocols',
		// 	'columns',
		// 	'divided',
		// 	'focused',
		// 	'rounded',
		// 	'size',
		// 	'sticky',
		// 	'theme',
		// 	'variant'
		// )
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
		.append('sticky top-0 z-10', sticky) // add overflow-clip & "rounded" to keep top rounding
		.append('rounded-b-none', rounded)
		.prepend('datagrid__header shadow-sm', true)
		.compile();

	$: gridHeaderClasses = th
		.create('DataGridHeader')
		.variant('gridHeader', variant, theme, variant)
		.append('auto-cols-fr', autocols)
		.prepend('datagrid__header_row grid grid-flow-col w-full', true)
		.append($$restProps.class, true)
		.compile();
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
