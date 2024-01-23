import { SvelteComponent } from "svelte";
import { type ColormodeProps } from './module';
import { type ColorModeHook } from '../../hooks';
import type { Unsubscriber } from 'svelte/store';
declare const __propDef: {
    props: ColormodeProps & import("svelte/elements").HTMLInputAttributes;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            store: import("svelte/store").Writable<boolean> & {
                getRoot: () => HTMLElement | null;
                getLocalValue: () => boolean;
                setLocalValue: (value: any) => void;
                enable: (mode: "dark" | "light") => void;
                toggle: () => void;
                reset: () => void;
            };
            checked: boolean;
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
