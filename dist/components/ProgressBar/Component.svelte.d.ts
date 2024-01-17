import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        store?: import("svelte/motion").Tweened<any> | undefined;
    } & import("./module").ProgressBarTweenedOptions<any> & {
        animate?: boolean | undefined;
        full?: boolean | undefined;
        max?: number | undefined;
        rounded?: import("../../types").ThemeRounded | undefined;
        shadowed?: import("../../types").ThemeShadowed | undefined;
        size?: import("../../types").ThemeSize | undefined;
        theme?: "default" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info" | undefined;
        value?: any;
        variant?: "filled" | undefined;
    } & Omit<import("svelte/elements").HTMLProgressAttributes, "size">;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
    get store(): import("svelte/motion").Tweened<any>;
}
export {};
