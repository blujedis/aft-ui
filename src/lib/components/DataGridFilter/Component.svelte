<script lang="ts">
	import { type DataGridFilterProps, gridFilterDefaults as defaults } from './module';
	import { themeStore, pickCleanProps, styler, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import type { DataGridContext } from '$lib/components/DataGrid';
	import { getContext } from 'svelte';
	import { DataGridCell } from '$lib/components/DataGridCell';
	import { debounce } from '$lib/utils';

	type $$Props = DataGridFilterProps & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { autocols, columns, focused, size, theme } = {
		...defaults,
		autocols: context.globals?.autocols,
		columns: context.globals?.columns,
		size: context.globals?.size,
		theme: context.globals?.theme
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
		.append('auto-cols-fr', autocols)
		.prepend('datagrid-filter', true)
		.append('grid grid-flow-col w-full body-light dark:body-dark', true)
		.append($$restProps.class, true)
		.compile();

	$: gridFilterCellClasses = th
		.create('DataGridFilterInputWrapper')
		.prepend('datagrid-filter-cell', true)
		.append('px-0 py-0', true)
		.compile();

	$: gridFilterInputClasses = th
		.create('DataGridFilterInput')
		.option('fieldPadding', size, size)
		.option('common', 'focusedOutlineVisible', focused)
		.option('outlineFocusVisible', theme, focused)
		.prepend('datagrid-filter-input outline-none w-full h-full bg-transparent', true)
		.compile();

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

{#if hasFilters}
	<div class={gridFilterClasses} style={gridFilterStyles}>
		<slot>
			{#each columns as col, i}
				<DataGridCell class={gridFilterCellClasses}>
					{#if col.filterable}
						<input
							type="text"
							placeholder="filter"
							class={gridFilterInputClasses}
							on:input={(e) => handleFilterColumn(e, col.accessor)}
						/>
					{/if}
				</DataGridCell>
			{/each}
		</slot>
	</div>
{/if}

<style>
	.datagrid-filter {
		grid-template-columns: var(--template-columns);
	}
</style>
