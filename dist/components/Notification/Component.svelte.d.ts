import { SvelteComponent } from "svelte";
import { type NotificationProps } from './module';
declare const __propDef: {
    props: NotificationProps & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
