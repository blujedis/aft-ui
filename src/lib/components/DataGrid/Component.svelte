<script lang="ts">
	import { setContext } from 'svelte';
	import { cleanObj, type SortAccessor, boolToMapValue, uniqid } from '$lib/utils';
	import { themeStore, themer } from '$lib/theme';
	import { useSelect } from '$lib/stores/select';
	import {
		type DataGridProps,
		gridDefaults as defaults,
		type DataGridColumnConfig,
		type DataGridStore,
		type DataGridContextProps,
		type DataGridDataItem
	} from './module';
	import type { DataGridFilterCriteria } from './filter';
	import type { ElementProps } from '$lib/types';

	type Column = $$Generic<DataGridColumnConfig>;
	type Data = $$Generic<DataGridDataItem>;

	type $$Props = DataGridProps<Column, Data> & ElementProps<'div'>;

	export let {
		autocols,
		columns,
		divided,
		filters,
		filter: initFilter,
		focused,
		full,
		reorderable,
		resizeable,
		rows,
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
		appliedFilters: [],
		mode: 'multiple',
		sorting: false,
		sort: [], // sorted accessor keys.
		rows: [], // source rows.
		selected: [], // selected rows.
		filtered: [], // current filtered rows.
		unsorted: [], // previous unsorted rows.
		columns: normalizeColumns(columns)
	});

	const globals: DataGridContextProps<Column, Data> = {
		autocols,
		columns,
		divided,
		filters,
		focused,
		full,
		reorderable,
		resizeable,
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
		globals: cleanObj(globals as any)
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
		.append('max-w-screen-md m-auto', stacked)
		.append('flow-root', true) // overflow-clip
		.append($$restProps.class, true)
		.compile();

	function getDataGridTemplate(cols: Column[]) {
		cols = cols || $store.columns;
		const values = cols.map((c) => c.width);
		return values.join(' ') + '';
	}

	function normalizeColumns(cols: Column[]) {
		const foundKeys = [] as string[];
		const normalized = cols.map((c) => {
			c.label = c.label || c.accessor;
			c.id = c.id || uniqid();
			c.width = c.width || '1fr';
			c.transform = c.transform || ((v: any) => v);
			// only allow row key to update on first init
			let curKey = c.rowkey as string;
			if (typeof curKey === 'undefined' && rowkey === c.accessor) curKey = rowkey;
			if (typeof curKey !== 'undefined' && !foundKeys.includes(curKey)) foundKeys.push(curKey);
			// set resizeable and reorderable if not specified by column config.
			if (typeof c.reorderable === 'undefined' && reorderable) c.reorderable = true;
			if (typeof c.resizeable === 'undefined' && resizeable) c.resizeable = true;
			return c;
		}) as Required<Column>[];
		rowkey = foundKeys[0];
		return normalized;
	}

	function updateColumn(
		accessor: string,
		config: Partial<DataGridColumnConfig>,
		done?: (columns: Required<Column>[]) => any
	) {
		const index = $store.columns.findIndex((c) => c.accessor == accessor);
		store.update((s) => {
			let columns = [...s.columns];
			columns[index] = { ...columns[index], ...config };
			columns = normalizeColumns(columns);
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

	async function filter(...criteria: DataGridFilterCriteria<Data>[]) {
		try {
			const filtered = await Promise.resolve(initFilter(criteria, $store.rows, $store.columns));
			store.update((s) => {
				return { ...s, filtered };
			});
		} catch (ex) {
			const err = ex as Error;
			console.warn(err.message);
		}
	}

	// function filter(
	// 	query: string,
	// 	accessor: DataGridFilterCriteria<Data> | DataGridFilterCriteria<Data>[],
	// 	...accessors: DataGridFilterCriteria<Data>[]
	// ) {
	// 	const _accessors = Array.isArray(accessor) ? accessor : [accessor, ...accessors];
	// 	Promise.resolve(initFilter(query, $store.rows as any, _accessors))
	// 		.then((filtered) => {
	// 			store.update((s) => {
	// 				return { ...s, filtered };
	// 			});
	// 		})
	// 		.catch((ex) => console.warn((ex as Error).message));
	// }

	function reset() {
		store.update((s) => {
			return { ...s, filtered: [...s.rows], sort: [], selected: [], unsorted: [...s.rows] };
		});
	}

	async function remove(key: string) {
		const item = $store.rows.find((item) => item[rowkey] === key);
		const shouldRemove = await Promise.resolve(onBeforeRemove(item));
		if (!shouldRemove) return;
		store.update((s) => {
			const newItems = s.rows.filter((item) => item[rowkey] !== key);
			const newFiltered = s.filtered.filter((item) => item[rowkey] !== key);
			return { ...s, rows: newItems, filtered: newFiltered };
		});
	}

	store.update((s) => {
		return { ...s, rows: [...rows], filtered: [...rows], unsorted: [...rows] };
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
