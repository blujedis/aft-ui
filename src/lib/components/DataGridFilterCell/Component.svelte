<script lang="ts">
	import {
		type DataGridFilterCellProps,
		gridFilterCellDefaults as defaults,
		filterPopoverDefaults
	} from './module';
	import { themeStore, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import type { DataGridContext, DataGridDataItem } from '$lib/components/DataGrid';
	import { type DataGridFilterCriteria } from '../DataGrid/filter';
	import { getContext } from 'svelte';
	import { DataGridCell } from '$lib/components/DataGridCell';
	import { debounce } from '$lib/utils';
	import FilterPopover from './FilterPopover.svelte';
	import { Popover } from '$lib/components';

	type Data = $$Generic<DataGridDataItem>;
	type $$Props = DataGridFilterCellProps & ElementProps<'div'>;

	const context = getContext('DataGrid') as DataGridContext;

	export let { column, focused, size, stacked, theme } = {
		...defaults,
		size: context.globals?.size,
		stacked: context.globals?.stacked,
		theme: context.globals?.theme
	} as Required<$$Props>;

	const filters = context.globals?.filters;

	let filterData = {
		...filterPopoverDefaults
	};

	const th = themer($themeStore);

	$: gridFilterCellClasses = th
		.create('DataGridFilterInputWrapper')
		.prepend('datagrid-filter-cell', true)
		.append('relative px-0 py-0 flex items-center', true)
		.compile();

	$: gridFilterInputClasses = th
		.create('DataGridFilterInput')
		.option('fieldPadding', size, size)
		.option('common', 'focusedOutlineVisible', focused)
		.option('outlineFocusVisible', theme, focused)
		.prepend('datagrid-filter-input', true)
		.append('outline-none bg-transparent relative w-full pr-8', true)
		.compile();

	function lookupFilterHandler(criteria: string) {
		return (context.globals?.filters || []).find((f) => f.value === criteria)?.handler;
	}

	function handleFilter(): void {
		const criteria = [
			{
				accessor: column.accessor,
				condition: filterData.criteriaOne,
				query: filterData.valueOne,
				handler: lookupFilterHandler(filterData.criteriaOne)
			}
		] as DataGridFilterCriteria<any>[];
		if (
			(filterData.criteriaTwo && filterData.valueTwo) ||
			['empty', '!empty'].includes(filterData.criteriaTwo)
		) {
			criteria.push({
				accessor: column.accessor,
				condition: filterData.criteriaTwo,
				query: filterData.valueTwo,
				join: filterData.join,
				handler: lookupFilterHandler(filterData.criteriaTwo)
			});
		}
		debounce(() => {
			context.filter(...criteria);
		}, 200)();
	}

	function handleInputChange() {
		if (!filterData.valueOne) handleResetFilter();
		else handleFilter();
	}

	function handleResetFilter() {
		filterData = {
			...filterPopoverDefaults
		};
		handleFilter();
	}
</script>

{#if !stacked}
	<DataGridCell class={gridFilterCellClasses}>
		{#if column.filterable}
			<slot>
				<input
					type="text"
					placeholder="filter"
					class={gridFilterInputClasses}
					bind:value={filterData.valueOne}
					on:input={handleInputChange}
				/>
			</slot>
			<slot name="icon">
				<button class="outline-none">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 pointer-events-none"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M15 19.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L9.29 16.7a.989.989 0 0 1-.29-.83v-5.12L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L15 10.75zM7.04 5L11 10.06v5.52l2 2v-7.53L16.96 5z"
						/></svg
					>
				</button>
				<Popover role="dialog" events="click" >
					<FilterPopover
						bind:data={filterData}
						{filters}
						applyFilter={handleFilter}
						resetFilter={handleResetFilter}
					/>
				</Popover>
			</slot>
		{/if}
	</DataGridCell>
{/if}
