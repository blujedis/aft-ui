<script lang="ts">
	import { type DataGridFilterProps, gridFilterDefaults as defaults } from './module';
	import { themeStore, bem, pickCleanProps, styler, themer } from '$lib';
	import type { ElementProps } from '../../types';
	import type { DataGridContext } from '../DataGrid';
	import { getContext } from 'svelte';
	import { DataGridCell } from '../DataGridCell';
	import { debounce } from '$lib/utils';

	type $$Props = DataGridFilterProps & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { autocols, columns, focused, size, theme, variant } = {
		...defaults,
		...pickCleanProps(
			context?.globals,
			'autocols',
			'columns',
			'focused',
			'size',
			'theme',
			'variant'
		)
	} as Required<$$Props>;

	const st = styler($themeStore);
	const th = themer($themeStore);

	$: hasFilters = columns.some((c) => c.filterable);

	$: gridFilterStyles = st
		.create('DataGridHeader')
		.add('--template-columns', context.getDataGridTemplate(), autocols)
		.compile();

	$: gridFilterClasses = th
		.create('DataGridFilter')
		.variant('gridFilter', variant, theme, variant)
		.append('auto-cols-fr', autocols)
		.prepend('datagrid__filter grid grid-flow-col w-full', true)
		.append($$restProps.class, true)
		.compile(true);

	$: filterInputCellClasses = th
		.create('DataGridFilterInput')
		.option('focusedRingWithin', theme, focused)
		.append('focus:outline-none', true)
		.compile(true);

	function handleFilterColumn(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
		accessor: string
	): void {
		const input = e.target as HTMLInputElement;
		if (input)
			debounce(() => {
				context.filter(input.value, accessor);
			})();
	}
</script>

<slot>
	{#if hasFilters}
		<div class={gridFilterClasses} style={gridFilterStyles}>
			{#each columns as col, i}
				<DataGridCell class={filterInputCellClasses}>
					{#if col.filterable}
						<input
							type="text"
							placeholder="filter"
							class="datagrid__filter_input focus:outline-none w-full bg-transparent"
							on:input={(e) => handleFilterColumn(e, col.accessor)}
						/>
					{/if}
				</DataGridCell>
			{/each}
		</div>
	{/if}
</slot>

<style>
	.grid__filter {
		grid-template-columns: var(--template-columns);
	}
</style>
