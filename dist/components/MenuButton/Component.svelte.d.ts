import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        rounded?: import("../../types").ThemeRounded;
        hovered?: boolean;
        full?: boolean;
        transitioned?: boolean;
        disabled?: boolean;
        shadowed?: import("../../types").ThemeShadowed;
        size?: import("../../types").ThemeSize;
        theme?: import("../../types").ThemeColor;
        bordered?: boolean;
        variant?: import("..").ButtonVariant;
        dropshadowed?: import("../../types").ThemeShadowed;
        href?: string | null;
        underlined?: boolean | "hover";
    } & {
        caret?: null | string | import("@iconify/svelte").IconifyIcon;
        roticon?: boolean;
        variant?: import("..").MenuButtonVariant;
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
