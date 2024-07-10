import { SvelteComponent } from "svelte";
import { type SwitchProps } from './module';
import type { ElementProps } from '../../types';
declare const __propDef: {
    props: SwitchProps & Omit<import("svelte/elements").HTMLInputAttributes, "size"> & {
        for?: ElementProps<"label">["for"];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
