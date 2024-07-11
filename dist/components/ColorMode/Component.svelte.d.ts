import { SvelteComponent } from "svelte";
import { type ColorModeHook } from '../../hooks';
import type { Unsubscriber } from 'svelte/store';
declare const __propDef: {
    props: {
        prefers?: "dark" | "light" | undefined;
        init?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            store: import("svelte/store").Writable<boolean> & {
                getRoot: () => HTMLElement | null;
                getLocalValue: () => boolean | null;
                setLocalValue: (value: boolean) => void;
                set: (isDark?: boolean) => void;
                toggle: () => void;
                reset: () => void;
            };
            dark: boolean;
            set: ((this: void, value: boolean) => void) & ((isDark?: boolean) => void);
            toggle: () => void;
            reset: () => void;
            subscribe: (fn: (dark: boolean, api: ColorModeHook) => Unsubscriber) => Unsubscriber;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
