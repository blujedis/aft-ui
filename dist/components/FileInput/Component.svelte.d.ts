import { SvelteComponent } from "svelte";
import { type FileInputProps } from './module';
declare const __propDef: {
    props: FileInputProps & import("svelte/elements").HTMLInputAttributes;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            onClick: () => void;
            onDrop: (e: DragEvent) => void;
            onDropOver: (e: DragEvent & {
                currentTarget: EventTarget & HTMLElement;
            }) => void;
            onDropEnd: (e: DragEvent & {
                currentTarget: EventTarget & HTMLElement;
            }) => void;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
