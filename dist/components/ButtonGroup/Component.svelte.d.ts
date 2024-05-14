import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Omit<import("../..").ButtonProps<"a" | "button">, "disabled" | "variant"> & {
        multiple?: boolean | undefined;
        value?: any;
        variant?: import("../..").ButtonGroupVariant | undefined;
    } & Omit<import("svelte/elements").HTMLAttributes<HTMLSpanElement>, "size">;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            selected: any;
            reset: (value?: any) => void;
            select: (value?: any) => void;
            unselect: (value?: any) => void;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
