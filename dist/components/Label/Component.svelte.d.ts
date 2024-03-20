import { SvelteComponent } from "svelte";
import { type LabelProps } from './module';
declare const __propDef: {
    props: LabelProps & Omit<import("svelte/elements").HTMLLabelAttributes, "size">;
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
