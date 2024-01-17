import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        store?: import("svelte/motion").Tweened<number> | undefined;
    } & import("../..").ProgressCircleTweenedOptions<any> & {
        animate?: boolean | undefined;
        max?: number | undefined;
        shadowed?: import("../..").ThemeShadowed | undefined;
        size?: number | import("../..").ThemeSize | undefined;
        text?: string | boolean | undefined;
        textunit?: string | undefined;
        theme?: "default" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info" | undefined;
        tracksize?: number | import("../..").ThemeSize | undefined;
        value?: any;
        variant?: "filled" | undefined;
    } & Omit<import("svelte/elements").SVGAttributes<SVGSVGElement>, "size">;
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
    get store(): import("svelte/motion").Tweened<number>;
}
export {};
