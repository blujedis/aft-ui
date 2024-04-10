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
	import { Icon, Popover } from '$lib/components';

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
		.option('common', 'focusedRingWithin', focused)
		.option('ringFocusWithin', theme, focused)
		.prepend('datagrid-filter-cell', true)
		.append('focus-within:ring-offset-0 focus-within:ring-inset', focused)
		.append('relative px-0 py-0 flex items-center z-10', true)
		.compile();

	$: gridFilterInputClasses = th
		.create('DataGridFilterInput')
		.option('fieldPadding', size, size)
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
				<button class="outline-none absolute right-2">
					<Icon icon="mdi:filter-outline" theme="frame" size="sm" />
				</button>
				<Popover role="dialog" events="click">
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
