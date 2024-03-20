import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        store?: import("svelte/motion").Tweened<number> | undefined;
    } & import("./module").ProgressCircleTweenedOptions<any> & {
        animate?: boolean | undefined;
        max?: number | undefined;
        shadowed?: import("../../types").ThemeShadowed | undefined;
        size?: number | import("../../types").ThemeSize | undefined;
        text?: string | boolean | undefined;
        textunit?: string | undefined;
        theme?: import("../../types").ThemeColor | undefined;
        tracksize?: number | import("../../types").ThemeSize | undefined;
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
