import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Omit<import("../RatingItem").RatingItemProps, "index"> & {
        arrowable?: boolean;
        hoverable?: boolean;
        count?: number;
        readonly?: boolean;
        shadowed?: import("../../types").ThemeShadowed;
        score?: number;
        updatable?: boolean;
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
}
export {};
