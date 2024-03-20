import { SvelteComponent } from "svelte";
import { type SelectListPanelProps } from './module';
declare const __propDef: {
    props: SelectListPanelProps & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            currentElement: HTMLElement | undefined;
            currentIndex: number | undefined;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
