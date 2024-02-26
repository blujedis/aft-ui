import type { ResizerPosition, ResizerRectangle } from '$lib/hooks';
import type { SelectStore } from '$lib/stores';
import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
} from '$lib/types';
import { searchArray, sortArray, type SortAccessor, type Primer } from '$lib/utils';

export type SortToken = 'asc' | 'desc' | 0 | 1 | '' | null;

export type DataGridDataItem = Record<string, any>;

export type DataGridColumnConfig<D = DataGridDataItem> = {
	label?: string;
	accessor: keyof D;
	sortable?: boolean;
	filterable?: boolean;
	width?: string; // ex: 50px will be converted to template columns.
	resizeable?: boolean;
} & Record<string, any>;

export type DataGridStore<C, D> = {
	sort: SortAccessor<D>[];
	columns: Required<C>[];
	items: D[];
	filtered: D[];
	datagrid?: HTMLDivElement;
};

export interface DataGridContextProps<C, D> {
	autocols: boolean;
	divided: boolean;
	columns: C[];
	focused: ThemeFocused;
	full: boolean;
	rowkey: keyof D;
	rounded: ThemeRounded;
	shadowed: ThemeShadowed;
	size: ThemeSize;
	stacked: boolean;
	sticky: boolean;
	striped: boolean;
	theme: ThemeColor;
	transitioned: boolean;
}

export type DataGridContext<C = DataGridColumnConfig, D = DataGridDataItem> = SelectStore<
	DataGridStore<C, D>
> & {
	sortby(...accessors: SortAccessor<D>[]): void;
	filter(query: string, ...accessors: (keyof D)[]): void;
	remove(rowkey: string): void;
	reset(): void;
	updateColumn: (accessor: string, config: Partial<DataGridColumnConfig>, done?: (columns: Required<DataGridColumnConfig>[]) => any) => void;
	getDataGridTemplate(columns?: C[]): string;
	getSortToken(accessor: keyof D): number;
	globals: DataGridContextProps<C, D>;
};

export type DataGridProps<C, D> = Partial<DataGridContextProps<C, D>> & {
	columns: C[];
	filter?(query: string, items: D[], ...accessors: (keyof D)[]): D[] | Promise<D[]>;
	sorter?: (items: D[], accessors: (keyof D)[], primer?: Primer) => D[] | Promise<D[]>;
	items?: D[] | Promise<D[]>;
	onAfterResize?: (props: ResizerPosition & ResizerRectangle) => any;
	onBeforeRemove?: (item?: D) => boolean | Promise<boolean>;
};

const defaultBeforeRemove = <D>(_item: D) => true;

export const gridDefaults: Partial<DataGridProps<DataGridColumnConfig, DataGridDataItem>> = {
	autocols: true,
	divided: true,
	size: 'md',
	theme: 'frame',
	filter: searchArray,
	sorter: sortArray,
	onBeforeRemove: defaultBeforeRemove
};
