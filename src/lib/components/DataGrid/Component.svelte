<script lang="ts">
	import { cleanObj, type SortAccessor } from '$lib/utils';
	import { setContext } from 'svelte';
	import { themeStore, themer, useSelect } from '$lib';
	import {
		type DataGridProps,
		gridDefaults as defaults,
		type DataGridColumnConfig,
		type DataGridStore,
		type DataGridContextProps,
		type DataGridDataItem
	} from './module';
	import type { ElementProps } from '../../types';

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
		sorter,
		sticky,
		stacked,
		striped,
		theme,
		transitioned,
		variant,
		onBeforeRemove
	} = {
		...(defaults as DataGridProps<Column, Data>)
	} as Required<DataGridProps<Column, Data>>;

	let grid = undefined as HTMLDivElement | undefined;

	export const store = useSelect<DataGridStore<Column, Data>>({
		grid,
		sort: [],
		selected: [],
		filtered: [],
		items: [],
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
		transitioned,
		variant
	};

	export const api = {
		sortby,
		filter,
		reset,
		remove,
		getDataGridTemplate,
		getSortToken
	};

	setContext('DataGrid', {
		...store,
		...api,
		globals: cleanObj(globals)
	});

	const th = themer($themeStore);

	$: gridClasses = th
		.create('DataGrid')
		.variant('grid', variant, theme, true)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('common', 'divided', divided)
		.option('common', 'ringed', divided)
		.option('fieldFontSizes', size, size)
		.prepend('datagrid overflow-clip flow-root', true)
		.append('divide-y', divided)
		.append('w-full', full)
		.append('relative', sticky)
		.append($$restProps.class, true)
		.compile(true);

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

	function updateSort(stored: SortAccessor<Data>[], accessors: SortAccessor<Data>[]) {
		let clone = [...accessors];
		const shouldPurge = accessors.filter((a) => a.charAt(0) === '-' && stored.includes(a));
		stored.forEach((s) => {
			if (!clone.includes(s) && !clone.includes(('-' + s) as any)) clone.unshift(s);
		});
		clone = clone.filter((c) => !shouldPurge.includes(c) && !!c);
		return [...clone];
	}

	function sortby(...accessors: SortAccessor<Data>[]) {
		const nextSort = updateSort($store.sort, accessors);

		Promise.resolve(sorter($store.filtered, nextSort))
			.then((filtered) => store.update((s) => ({ ...s, filtered, sort: nextSort })))
			.catch((ex) => console.warn((ex as Error).message));
	}

	function getSortToken(accessor: Extract<keyof Data, string>) {
		const token = $store.sort.filter((k) => [accessor, `-${accessor}`].includes(k));
		if (!token[0]) return 0;
		return token[0].charAt(0) === '-' ? -1 : 1;
	}

	function filter(query: string, ...accessors: (keyof Data)[]) {
		Promise.resolve(initFilter(query, $store.items as any, ...accessors))
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

	function getDataGridTemplate(
		name = 'cols' as 'rows' | 'cols',
		cols = $store.columns as Column[]
	) {
		const values = cols.map((c) => c.width);
		return values.join(' ') + '';
	}

	function normalizeColumns(cols: Column[]) {
		return cols.map((c) => {
			c.label = c.label || c.accessor;
			return c;
		}) as Required<Column>[];
	}

	Promise.resolve(items).then((i) => {
		store.update((s) => {
			return { ...s, items: i.sort(), filtered: [...i] };
		});
	});
</script>

<div bind:this={grid} {...$$restProps} class={gridClasses}>
	<slot rows={$store.filtered} columns={$store.columns} {remove} {filter} {reset} {sortby} />
</div>
