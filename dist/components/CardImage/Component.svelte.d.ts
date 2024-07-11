import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: import("svelte/elements").HTMLImgAttributes & {
        fit?: import("../../types").ThemeObjectFit;
        full?: boolean | "w" | "h" | "width" | "height";
        lazyload?: boolean | import("../../utils").LazyImageOptions;
        position?: import("../../types").ThemeObjectPosition;
        rounded?: import("../../types").ThemeRounded;
        shadowed?: import("../../types").ThemeShadowed;
    } & {
        imageClasses?: string;
    };
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
}
export {};
