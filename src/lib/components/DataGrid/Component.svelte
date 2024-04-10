<script lang="ts">
	import { setContext } from 'svelte';
	import { cleanObj, type SortAccessor, boolToMapValue, uniqid } from '$lib/utils';
	import { ensureArray, themeStore, themer } from '$lib/theme';
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
		sortable,
		sorter,
		sticky,
		stacked,
		striped,
		theme,
		transitioned,
		onBeforeRemove
	} = {
		...cleanObj($themeStore.defaults?.component),
		...(defaults as DataGridProps<Column, Data>)
	} as Required<DataGridProps<Column, Data>>;

	let datagrid = undefined as HTMLDivElement | undefined;

	export const store = useSelect<DataGridStore<Column, Data>>({
		datagrid,
		mode: 'multiple',
		filters: [], // applied filters
		sort: [], // applied sort.
		rows: [], // source rows.
		selected: [], // selected rows.
		filtered: [], // current filtered rows.
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
		sortable,
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
		.option('elementDivide', theme, divided)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('elementBorder', theme, divided)
		.option('fieldFontSizes', size, size)
		.prepend(`datagrid`, true)
		.append('w-full', full)
		.append('border', divided)
		.append('relative', sticky)
		.append('w-full', !stacked)
		.append('max-w-screen-md m-auto', stacked)
		.append('flow-root overflow-clip', true)
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
			if (typeof c.sortable === 'undefined' && sortable) c.sortable = true;
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

	function getSortToken(accessor: Extract<keyof Data, string>) {
		const token = $store.sort.filter((k) => [accessor, `-${accessor}`].includes(k));
		if (!token[0]) return 0;
		return token[0].charAt(0) === '-' ? -1 : 1;
	}

	async function resolveFilter(criteria: DataGridFilterCriteria<Data>[]) {
		return Promise.resolve(initFilter(criteria, $store.rows, $store.columns));
	}

	async function sortby(accessors?: SortAccessor<Data> | SortAccessor<Data>[], reset = false) {
		const _accessors = ensureArray(accessors).filter((v) => typeof v !== 'undefined' && v !== '');
		if (!_accessors.length) reset = true;
		const filtered = await resolveFilter($store.filters);
		if (reset) {
			store.update((s) => {
				return { ...s, filtered: [...filtered], sort: [] };
			});
		} else {
			const sort = _accessors;
			Promise.resolve(sorter(filtered, sort))
				.then((sorted) => {
					store.update((s) => {
						return { ...s, filtered: [...sorted], sort };
					});
				})
				.catch((ex) => console.warn((ex as Error).message));
		}
	}

	async function filter(...criteria: DataGridFilterCriteria<Data>[]) {
		try {
			const filtered = await resolveFilter(criteria);
			store.update((s) => {
				return { ...s, filtered, filters: criteria };
			});
		} catch (ex) {
			const err = ex as Error;
			console.warn(err.message);
		}
	}

	function reset() {
		store.update((s) => {
			return { ...s, filtered: [...s.rows], sort: [], selected: [] };
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
		return { ...s, rows: [...rows], filtered: [...rows] };
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

<slot name="pager" />
