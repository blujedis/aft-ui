import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Omit<import("..").ButtonProps<"button">, "full" | "variant"> & {
        caret?: import("../../types").Iconify | undefined;
        roticon?: string | boolean | undefined;
        key?: import("../..").SelectStoreValue | undefined;
        theme?: "default" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info" | undefined;
        variant?: "flushed" | "filled" | "outlined" | undefined;
    } & import("svelte/elements").HTMLButtonAttributes;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        caret: {};
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
