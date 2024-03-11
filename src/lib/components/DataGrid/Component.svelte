<script lang="ts">
	import { useResizer } from '$lib/hooks';
	import { setContext } from 'svelte';
	import { cleanObj, type SortAccessor, boolToMapValue, uniqid } from '$lib/utils';
	import { themeStore, themer } from '$lib/theme';
	import { useSelect } from '$lib/stores';
	import {
		type DataGridProps,
		gridDefaults as defaults,
		type DataGridColumnConfig,
		type DataGridStore,
		type DataGridContextProps,
		type DataGridDataItem,

		type FilterAccessor

	} from './module';
	import type { ElementProps } from '$lib/types';

	type Column = $$Generic<DataGridColumnConfig>;
	type Data = $$Generic<DataGridDataItem>;

	type $$Props = DataGridProps<Column, Data> & ElementProps<'div'>;

	export let {
		autocols,
		columns,
		divided,
		filter: initFilter,
		focused,
		full,
		items,
		rounded,
		rowkey,
		shadowed,
		size,
		sortMultiple,
		sorter,
		sticky,
		stacked,
		striped,
		theme,
		transitioned,
		onBeforeRemove
	} = {
		...(defaults as DataGridProps<Column, Data>)
	} as Required<DataGridProps<Column, Data>>;

	let datagrid = undefined as HTMLDivElement | undefined;

	export const store = useSelect<DataGridStore<Column, Data>>({
		datagrid: datagrid,
		sorting: false,
		sort: [],
		selected: [],
		filtered: [],
		items: [],
		unsorted: [],
		columns: normalizeColumns(columns)
	});

	const globals: DataGridContextProps<Column, Data> = {
		autocols,
		columns,
		divided,
		focused,
		full,
		rounded,
		rowkey,
		shadowed,
		size,
		sticky,
		stacked,
		striped,
		theme,
		transitioned
	};

	export const api = {
		sortby,
		filter,
		reset,
		remove,
		getDataGridTemplate,
		getSortToken,
		updateColumn,
		swapColumns
	};

	setContext('DataGrid', {
		...store,
		...api,
		globals: cleanObj(globals)
	});

	const th = themer($themeStore);

	$: gridClasses = th
		.create('DataGrid')
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'divided', divided)
		.option('common', 'bordered', divided)
		.option('fieldFontSizes', size, size)
		.prepend(`datagrid`, true)
		.append('divide-y', divided)
		.append('w-full', full)
		.append('relative', sticky)
		.append('border', divided)
		.append('flow-root', true) // overflow-clip
		.append($$restProps.class, true)
		.compile();

	function getDataGridTemplate(cols: Column[]) {
		cols = cols || $store.columns;
		const values = cols.map((c) => c.width);
		return values.join(' ') + '';
	}

	function normalizeColumns(cols: Column[]) {
		return cols.map((c) => {
			c.label = c.label || c.accessor;
			c.id = c.id || uniqid();
			c.width = c.width || '1fr';
			return c;
		}) as Required<Column>[];
	}

	function updateColumn(
		accessor: string,
		config: Partial<DataGridColumnConfig>,
		done?: (columns: Required<Column>[]) => any
	) {
		const index = $store.columns.findIndex((c) => c.accessor == accessor);
		store.update((s) => {
			const columns = [...s.columns];
			columns[index] = { ...columns[index], ...config };
			if (done) done(columns);
			return { ...s, columns };
		});
	}

	function swapColumns(source: number, target: number) {
		const cols = [...$store.columns];
		const sourceCol = cols[source];
		const targetCol = cols[target];
		cols[source] = targetCol;
		cols[target] = sourceCol;
		store.update((s) => {
			return { ...s, columns: cols };
		});
	}
	/**
	 * Normalizes the sort array preparing for sorting.
	 * If the previous sort array contained ['category'] it's next state would be ['-category']
	 * the next after that would be [] covering all three states.
	 *
	 * @param stored
	 * @param accessors
	 */
	function prepareSortArray(stored: SortAccessor<Data>[], accessors: SortAccessor<Data>[]) {
		let clone = [...accessors];

		const shouldPurge = accessors.filter((a) => a.charAt(0) === '-' && stored.includes(a));

		stored.forEach((s) => {
			if (!clone.includes(s) && !clone.includes(('-' + s) as any)) clone.unshift(s);
		});

		clone = clone.filter((c) => !shouldPurge.includes(c) && !!c);

		return clone;
	}

	function getSortToken(accessor: Extract<keyof Data, string>) {
		const token = $store.sort.filter((k) => [accessor, `-${accessor}`].includes(k));
		if (!token[0]) return 0;
		return token[0].charAt(0) === '-' ? -1 : 1;
	}

	function sortby(...accessors: SortAccessor<Data>[]) {
		const nextSort = prepareSortArray(
			sortMultiple ? [...$store.sort] : [$store.sort[0]],
			accessors
		);

		const collection = !nextSort.length ? $store.unsorted : $store.filtered;
		const obj = { sort: nextSort } as any;

		if (!$store.sorting) {
			obj.sorting = true;
			obj.unsorted = [...$store.filtered];
		}

		if (!nextSort.length) {
			obj.sorting = false;
			obj.unsorted = [];
		}

		Promise.resolve(sorter(collection, nextSort))
			.then((filtered) =>
				store.update((s) => {
					return { ...s, filtered, ...obj };
				})
			)
			.catch((ex) => console.warn((ex as Error).message));
	}

	function filter(query: string, accessor: FilterAccessor<Data> | FilterAccessor<Data>[], ...accessors: FilterAccessor<Data>[]) {
		const _accessors = Array.isArray(accessor) ? accessor : [accessor, ...accessors];
		Promise.resolve(initFilter(query, $store.items as any, _accessors))
			.then((filtered) => {
				store.update((s) => {
					return { ...s, filtered };
				});
			})
			.catch((ex) => console.warn((ex as Error).message));
	}

	function reset() {
		store.update((s) => {
			return { ...s, filtered: [...s.items], sort: [] };
		});
	}

	async function remove(key: string) {
		const item = $store.items.find((item) => item[rowkey] === key);
		const shouldRemove = await Promise.resolve(onBeforeRemove(item));
		if (!shouldRemove) return;
		store.update((s) => {
			const newItems = s.items.filter((item) => item[rowkey] !== key);
			const newFiltered = s.filtered.filter((item) => item[rowkey] !== key);
			return { ...s, items: newItems, filtered: newFiltered };
		});
	}

	Promise.resolve(items).then((i) => {
		store.update((s) => {
			return { ...s, items: [...i], filtered: [...i], unsorted: [...i] };
		});
	});
</script>

<div bind:this={datagrid} {...$$restProps} class={gridClasses}>
	<slot
		rows={$store.filtered}
		columns={$store.columns}
		{remove}
		{filter}
		{reset}
		{sortby}
		{stacked}
	/>
</div>
