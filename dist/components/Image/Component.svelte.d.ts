import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: import("svelte/elements").HTMLImgAttributes & {
        fit?: "fill" | "unstyled" | "none" | "contain" | "cover" | "scaled" | undefined;
        full?: boolean | "width" | "height" | "w" | "h" | undefined;
        lazyload?: boolean | import("../../utils").LazyImageOptions | undefined;
        position?: "unstyled" | "center" | "top" | "top-right" | "top-left" | "bottom" | "bottom-right" | "botom-left" | "left" | "right" | undefined;
        rounded?: import("../../types").ThemeRounded | undefined;
        shadowed?: import("../../types").ThemeShadowed | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
