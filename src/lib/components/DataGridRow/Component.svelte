<script lang="ts">
	import { type DataGridRowProps, gridRowDefaults as defaults } from './module';
	import themeStore, { pickCleanProps, styler, themer } from '$lib';
	import type { ElementProps } from '../../types';
	import type { DataGridContext } from '../DataGrid';
	import { getContext } from 'svelte';

	type $$Props = DataGridRowProps & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { autocols, columns, divided, size, striped, stacked, theme, variant } = {
		...defaults,
		...pickCleanProps(
			context?.globals,
			'autocols',
			'columns',
			'divided',
			'size',
			'stacked',
			'striped',
			'theme',
			'variant'
		)
	} as Required<$$Props>;

	const st = styler($themeStore);

	$: gridRowStyles = st
		.create('DataGridRow')
		.add('--template-columns', context.getDataGridTemplate(), autocols)
		.append($$restProps.style, true)
		.compile();

	$: gridRowClasses = themer($themeStore)
		.create('DataGridRow')
		.option('common', 'divided', divided)
		.append('divide-x', divided)
		.append('grid grid-flow-col w-full', !stacked)
		.append('grid grid-flow-row w-full', stacked)
		.append(stacked ? 'auto-rows-fr' : 'auto-cols-fr', autocols)
		.append('grid__row', true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {...$$restProps} class={gridRowClasses} style={gridRowStyles}>
	<slot />
</div>

<style>
	.grid__row {
		grid-template-columns: var(--template-columns);
	}
</style>
