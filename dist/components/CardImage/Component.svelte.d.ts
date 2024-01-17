import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: import("../Image").ImageProps & {
        imageClasses?: string | undefined;
    } & import("svelte/elements").HTMLImgAttributes;
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
