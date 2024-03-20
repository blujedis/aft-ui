import { SvelteComponent } from "svelte";
import { type MenuProps } from './module';
import type { MenuGlobalProps } from './';
declare const __propDef: {
    props: {
        store?: import("../../stores").DisclosureStore | undefined;
    } & MenuProps & MenuGlobalProps & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            visible: boolean | undefined;
            active: unknown;
            open: () => void;
            close: () => void;
            toggle: () => void;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
    get store(): import("svelte/store").Writable<import("../../stores").DisclosureStoreOptions<Record<string, unknown>>> & import("../../stores").DisclosureMethods<Record<string, unknown>>;
}
export {};
