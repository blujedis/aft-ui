import { SvelteComponent } from "svelte";
import { type SelectOptionProps } from './module';
declare const __propDef: {
    props: SelectOptionProps & import("svelte/elements").HTMLOptionAttributes;
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
