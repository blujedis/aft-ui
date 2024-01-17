import { SvelteComponent } from "svelte";
import { type SortAccessor } from '../../utils';
import { type DataGridColumnConfig, type DataGridStore, type DataGridContextProps, type DataGridDataItem } from './module';
declare class __sveltets_Render<Column extends DataGridColumnConfig, Data extends DataGridDataItem> {
    props(): {
        store?: import("../..").SelectStore<DataGridStore<Column, Data>> | undefined;
        api?: {
            sortby: (...accessors: SortAccessor<Data>[]) => void;
            filter: (query: string, ...accessors: (keyof Data)[]) => void;
            reset: () => void;
            remove: (key: string) => Promise<void>;
            getDataGridTemplate: (name?: "rows" | "cols", cols?: Column[]) => string;
            getSortToken: (accessor: Extract<keyof Data, string>) => 0 | 1 | -1;
        } | undefined;
    } & Partial<DataGridContextProps<Column, Data>> & {
        columns: Column[];
        filter?(query: string, items: Data[], ...accessors: (keyof Data)[]): Data[] | Promise<Data[]>;
        sorter?: ((items: Data[], accessors: (keyof Data)[], primer?: import("../../utils").Primer | undefined) => Data[] | Promise<Data[]>) | undefined;
        items?: Data[] | Promise<Data[]> | undefined;
        onBeforeRemove?: ((item?: Data | undefined) => boolean | Promise<boolean>) | undefined;
    } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            rows: Data[];
            columns: Required<Column>[];
            remove: (key: string) => Promise<void>;
            filter: (query: string, ...accessors: (keyof Data)[]) => void;
            reset: () => void;
            sortby: (...accessors: SortAccessor<Data>[]) => void;
        };
    };
}
export type ComponentProps<Column extends DataGridColumnConfig, Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Column, Data>['props']>;
export type ComponentEvents<Column extends DataGridColumnConfig, Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Column, Data>['events']>;
export type ComponentSlots<Column extends DataGridColumnConfig, Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Column, Data>['slots']>;
export default class Component<Column extends DataGridColumnConfig, Data extends DataGridDataItem> extends SvelteComponent<ComponentProps<Column, Data>, ComponentEvents<Column, Data>, ComponentSlots<Column, Data>> {
    get store(): import("svelte/store").Writable<import("../..").SelectStoreOptions & DataGridStore<Column, Data>> & import("../..").SelectStoreMethods;
    get api(): {
        sortby: (...accessors: SortAccessor<Data>[]) => void;
        filter: (query: string, ...accessors: (keyof Data)[]) => void;
        reset: () => void;
        remove: (key: string) => Promise<void>;
        getDataGridTemplate: (name?: "rows" | "cols", cols?: Column[]) => string;
        getSortToken: (accessor: Extract<keyof Data, string>) => 0 | 1 | -1;
    };
}
export {};
