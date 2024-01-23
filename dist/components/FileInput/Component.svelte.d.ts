import { SvelteComponent } from "svelte";
import { type FileInputProps } from './module';
declare const __propDef: {
    props: FileInputProps & import("svelte/elements").HTMLInputAttributes;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            click: () => void;
            drop: (e: DragEvent & {
                currentTarget: EventTarget & HTMLElement;
            }) => void;
        };
        input: {};
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
