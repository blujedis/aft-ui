import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        style?: string | undefined;
        unstyled?: boolean | undefined;
        theme?: "light" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info" | "white" | undefined;
        size?: import("../..").ThemeSize | undefined;
        class?: string | undefined;
        id?: string | undefined;
        color?: string | undefined;
        inline?: boolean | undefined;
        mode?: import("@iconify/svelte").IconifyRenderMode | undefined;
        flip?: string | undefined;
        rotate?: number | undefined;
        hFlip?: boolean | undefined;
        vFlip?: boolean | undefined;
        width?: import("@iconify/svelte").IconifyIconSize | undefined;
        height?: import("@iconify/svelte").IconifyIconSize | undefined;
        visible?: boolean | undefined;
        icon?: string | import("@iconify/svelte").IconifyIcon | undefined;
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
