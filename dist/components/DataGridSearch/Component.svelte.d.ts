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
                (criteria: import("../DataGrid/filter").DataGridFilterCriteria<import("../DataGrid").DataGridDataItem>): void;
                (...criteria: import("../DataGrid/filter").DataGridFilterCriteria<import("../DataGrid").DataGridDataItem>[]): void;
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
