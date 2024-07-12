import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        store?: import("svelte/motion").Tweened<any>;
    } & import("./module").ProgressBarTweenedOptions<any> & {
        animate?: boolean;
        full?: boolean;
        max?: number;
        rounded?: import("../../types").ThemeRounded;
        shadowed?: import("../../types").ThemeShadowed;
        size?: import("../../types").ThemeSize;
        theme?: import("../../types").ThemeColor;
        value?: any;
        variant?: import("./module").ProgressBarVariant;
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
