import { SvelteComponent } from "svelte";
import { type DataGridSearchProps } from './module';
declare const __propDef: {
    props: DataGridSearchProps & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            search: {
                (query: string, accessors?: import("../DataGrid").FilterAccessor<import("../DataGrid").DataGridDataItem>[] | undefined): void;
                (query: string, accessor: import("../DataGrid").FilterAccessor<import("../DataGrid").DataGridDataItem>, ...accessors: import("../DataGrid").FilterAccessor<import("../DataGrid").DataGridDataItem>[]): void;
            };
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
