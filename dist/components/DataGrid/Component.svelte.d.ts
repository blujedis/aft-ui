import { SvelteComponent } from "svelte";
import { type SortAccessor } from '../../utils';
import { type DataGridColumnConfig, type DataGridStore, type DataGridContextProps, type DataGridDataItem, type FilterAccessor } from './module';
declare class __sveltets_Render<Column extends DataGridColumnConfig, Data extends DataGridDataItem> {
    props(): {
        store?: import("../../stores").SelectStore<DataGridStore<Column, Data>> | undefined;
        api?: {
            sortby: (...accessors: SortAccessor<Data>[]) => void;
            filter: (query: string, accessor: FilterAccessor<Data> | FilterAccessor<Data>[], ...accessors: FilterAccessor<Data>[]) => void;
            reset: () => void;
            remove: (key: string) => Promise<void>;
            getDataGridTemplate: (cols: Column[]) => string;
            getSortToken: (accessor: Extract<keyof Data, string>) => 0 | 1 | -1;
            updateColumn: (accessor: string, config: Partial<DataGridColumnConfig>, done?: ((columns: Required<Column>[]) => any) | undefined) => void;
            swapColumns: (source: number, target: number) => void;
        } | undefined;
    } & Partial<DataGridContextProps<Column, Data>> & {
        columns: Column[];
        filter?(query: string, items: Data[], accessors: FilterAccessor<Data>[]): Data[] | Promise<Data[]>;
        sortMultiple?: boolean | undefined;
        sorter?: ((items: Data[], accessors: (keyof Data)[], primer?: import("../../utils").Primer | undefined) => Data[] | Promise<Data[]>) | undefined;
        rows?: Data[] | undefined;
        onAfterResize?: ((props: import("../../hooks").ResizerPosition & import("../../hooks").ResizerRectangle) => any) | undefined;
        onBeforeRemove?: ((item?: Data | undefined) => boolean | Promise<boolean>) | undefined;
    } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            rows: (Data & Record<string, unknown>)[];
            columns: Required<Column>[];
            remove: (key: string) => Promise<void>;
            filter: (query: string, accessor: FilterAccessor<Data> | FilterAccessor<Data>[], ...accessors: FilterAccessor<Data>[]) => void;
            reset: () => void;
            sortby: (...accessors: SortAccessor<Data>[]) => void;
            stacked: boolean;
        };
    };
}
export type ComponentProps<Column extends DataGridColumnConfig, Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Column, Data>['props']>;
export type ComponentEvents<Column extends DataGridColumnConfig, Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Column, Data>['events']>;
export type ComponentSlots<Column extends DataGridColumnConfig, Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Column, Data>['slots']>;
export default class Component<Column extends DataGridColumnConfig, Data extends DataGridDataItem> extends SvelteComponent<ComponentProps<Column, Data>, ComponentEvents<Column, Data>, ComponentSlots<Column, Data>> {
    get store(): import("svelte/store").Writable<import("../../stores").SelectStoreOptions & DataGridStore<Column, Data>> & import("../../stores").SelectStoreMethods;
    get api(): {
        sortby: (...accessors: SortAccessor<Data>[]) => void;
        filter: (query: string, accessor: FilterAccessor<Data> | FilterAccessor<Data>[], ...accessors: FilterAccessor<Data>[]) => void;
        reset: () => void;
        remove: (key: string) => Promise<void>;
        getDataGridTemplate: (cols: Column[]) => string;
        getSortToken: (accessor: Extract<keyof Data, string>) => 0 | 1 | -1;
        updateColumn: (accessor: string, config: Partial<DataGridColumnConfig>, done?: ((columns: Required<Column>[]) => any) | undefined) => void;
        swapColumns: (source: number, target: number) => void;
    };
}
export {};
