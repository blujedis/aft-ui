<script lang="ts">
	import { type DataGridBodyProps, gridBodyDefaults as defaults } from './module';
	import { themeStore, pickCleanProps, styler, themer } from '$lib';
	import type { ElementProps } from '../../types';
	import type { DataGridContext } from '../DataGrid';
	import { getContext } from 'svelte';

	type $$Props = DataGridBodyProps & ElementProps<'div'>;

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

	const th = themer($themeStore);

	$: gridBodyClasses = th
		.create('DataGridBody')
		.option('common', 'divided', divided)
		.prepend('datagrid__body overflow-y-auto', true)
		.append('divide-y', divided)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {...$$restProps} class={gridBodyClasses}>
	<slot />
</div>
