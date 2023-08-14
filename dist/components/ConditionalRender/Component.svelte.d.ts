import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        condition: boolean | ((...args: any[]) => boolean);
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        unsatisfied: {};
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
