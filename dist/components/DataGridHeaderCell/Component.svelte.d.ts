import { SvelteComponent } from "svelte";
import type { DataGridDataItem } from '../DataGrid';
declare class __sveltets_Render<Data extends DataGridDataItem> {
    props(): import("..").DataGridCellProps & {
        accessor: keyof Data;
        focused?: boolean;
    } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            sort: () => void;
            sortdir: 0 | 1 | -1;
        };
    };
}
export type ComponentProps<Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Data>['props']>;
export type ComponentEvents<Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Data>['events']>;
export type ComponentSlots<Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Data>['slots']>;
export default class Component<Data extends DataGridDataItem> extends SvelteComponent<ComponentProps<Data>, ComponentEvents<Data>, ComponentSlots<Data>> {
}
export {};
