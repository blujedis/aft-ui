import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        strong?: boolean | undefined;
        hovered?: boolean | undefined;
        unstyled?: boolean | undefined;
        rounded?: import("../../types").ThemeRounded | undefined;
        full?: boolean | undefined;
        disabled?: boolean | undefined;
        transitioned?: boolean | undefined;
        shadowed?: import("../../types").ThemeShadowed | undefined;
        size?: import("../../types").ThemeSize | undefined;
        theme?: "default" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info" | undefined;
        variant?: "text" | "filled" | "outlined" | "ghost" | undefined;
        href?: string | null | undefined;
        underlined?: boolean | "hover" | undefined;
    } & {
        caret?: string | import("@iconify/svelte").IconifyIcon | null | undefined;
        roticon?: boolean | undefined;
        variant?: "text" | "filled" | "outlined" | "ghost" | undefined;
    } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
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
