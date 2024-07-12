import { SvelteComponent } from "svelte";
import { type DataGridFilterCellProps } from './module';
import type { DataGridDataItem } from '../DataGrid';
declare class __sveltets_Render<Data extends DataGridDataItem> {
    props(): DataGridFilterCellProps & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {};
        icon: {};
    };
}
export type ComponentProps<Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Data>['props']>;
export type ComponentEvents<Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Data>['events']>;
export type ComponentSlots<Data extends DataGridDataItem> = ReturnType<__sveltets_Render<Data>['slots']>;
export default class Component<Data extends DataGridDataItem> extends SvelteComponent<ComponentProps<Data>, ComponentEvents<Data>, ComponentSlots<Data>> {
}
export {};
