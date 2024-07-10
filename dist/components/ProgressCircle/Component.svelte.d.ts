import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        store?: import("svelte/motion").Tweened<number>;
    } & import("./module").ProgressCircleTweenedOptions<any> & {
        animate?: boolean;
        max?: number;
        shadowed?: import("../../types").ThemeShadowed;
        size?: import("../../types").ThemeSize | number;
        text?: boolean | string;
        textunit?: string;
        theme?: import("../../types").ThemeColor;
        tracksize?: import("../../types").ThemeSize | number;
        value?: any;
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
