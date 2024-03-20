import type { ResizerPosition, ResizerRectangle } from '../../hooks';
import type { SelectStore } from '../../stores';
import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize, TypeOrValue } from '../../types';
import { type SortAccessor, type Primer } from '../../utils';
export type SortToken = 'asc' | 'desc' | 0 | 1 | '' | null;
export type DataGridDataItem = Record<string, unknown>;
export type FilterAccessor<D> = keyof D | ({
    accessor: keyof D;
} & Record<string, unknown>);
export type DataGridColumnConfig<D = DataGridDataItem> = {
    id?: string | number;
    label?: string;
    accessor: TypeOrValue<keyof D>;
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    draggable?: boolean;
    resizeable?: boolean;
    static?: boolean;
} & Record<string, unknown>;
export type DataGridStore<C, D> = {
    sorting: boolean;
    sort: SortAccessor<D>[];
    columns: Required<C>[];
    rows: D[];
    filtered: (D & Record<string, unknown>)[];
    unsorted: D[];
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
export type DataGridContext<C = DataGridColumnConfig, D = DataGridDataItem> = SelectStore<DataGridStore<C, D>> & {
    sortby(...accessors: SortAccessor<D>[]): void;
    filter(query: string, accessors?: FilterAccessor<D>[]): void;
    filter(query: string, accessor: FilterAccessor<D>, ...accessors: FilterAccessor<D>[]): void;
    remove(rowkey: string): void;
    reset(): void;
    updateColumn: (accessor: string, config: Partial<DataGridColumnConfig>, done?: (columns: Required<DataGridColumnConfig>[]) => any) => void;
    swapColumns: (source: number, target: number) => void;
    getDataGridTemplate(columns?: C[]): string;
    getSortToken(accessor: keyof D): number;
    globals: DataGridContextProps<C, D>;
};
export type DataGridProps<C, D> = Partial<DataGridContextProps<C, D>> & {
    columns: C[];
    filter?(query: string, items: D[], accessors: FilterAccessor<D>[]): D[] | Promise<D[]>;
    sortMultiple?: boolean;
    sorter?: (items: D[], accessors: (keyof D)[], primer?: Primer) => D[] | Promise<D[]>;
    rows?: D[];
    onAfterResize?: (props: ResizerPosition & ResizerRectangle) => any;
    onBeforeRemove?: (item?: D) => boolean | Promise<boolean>;
};
export declare const gridDefaults: Partial<DataGridProps<DataGridColumnConfig, DataGridDataItem>>;
