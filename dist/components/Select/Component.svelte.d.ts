import { SvelteComponent } from "svelte";
import { type SelectProps, type SelectContext } from './module';
declare const __propDef: {
    props: {
        context?: SelectContext | undefined;
    } & SelectProps & Omit<import("svelte/elements").HTMLSelectAttributes, "size">;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            selectedItems: import("../..").SelectStoreValue[] & (string | number)[];
            select: (value?: import("../..").SelectStoreValue | undefined) => void;
            unselect: (value?: import("../..").SelectStoreValue | undefined) => void;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
    get context(): import("svelte/store").Writable<import("../..").SelectStoreOptions & Record<string, any>> & import("../..").SelectStoreMethods;
}
export {};
