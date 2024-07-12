import { SvelteComponent } from "svelte";
import { type FileInputProps } from './module';
declare const __propDef: {
    props: FileInputProps & import("svelte/elements").HTMLInputAttributes;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            input: HTMLInputElement;
            state: 0 | 1 | 2 | 3;
            onClick: (e: MouseEvent & {
                currentTarget: any;
            }) => void;
            onDrop: (e: DragEvent) => void;
            onDragOver: (e: DragEvent & {
                currentTarget: any;
            }) => void;
            onDragEnd: (e: DragEvent & {
                currentTarget: any;
            }) => void;
            onDragLeave: (e: DragEvent & {
                currentTarget: any;
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
