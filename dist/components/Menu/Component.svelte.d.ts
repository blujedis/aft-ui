import { SvelteComponent } from "svelte";
import { type MenuProps } from './module';
import type { MenuGlobalProps } from '../Menu';
declare const __propDef: {
    props: {
        store?: import("../..").DisclosureStore | undefined;
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
    get store(): import("svelte/store").Writable<import("../..").DisclosureStoreOptions<Record<string, unknown>>> & import("../..").DisclosureMethods<Record<string, unknown>>;
}
export {};
