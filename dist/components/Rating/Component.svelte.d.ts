import { SvelteComponent } from "svelte";
import { type RatingStoreValue } from './module';
declare const __propDef: {
    props: {
        store?: import("svelte/store").Writable<RatingStoreValue> | undefined;
    } & Omit<import("../RatingItem/module").RatingItemProps, "index"> & {
        arrowable?: boolean | undefined;
        hoverable?: boolean | undefined;
        count?: number | undefined;
        readonly?: boolean | undefined;
        shadowed?: import("../../types").ThemeShadowed | undefined;
        score?: number | undefined;
        updatable?: boolean | undefined;
    } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            score: number;
            active: number;
            selected: number;
            mouseover: (active: number, e: MouseEvent) => void;
            mouseleave: (active: number, e: MouseEvent) => void;
            select: (selected: number, e: MouseEvent) => void;
            reset: () => void;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
    get store(): import("svelte/store").Writable<RatingStoreValue>;
}
export {};
