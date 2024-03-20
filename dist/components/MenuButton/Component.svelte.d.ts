import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        rounded?: import("../../types").ThemeRounded | undefined;
        hovered?: boolean | undefined;
        full?: boolean | undefined;
        shadowed?: import("../../types").ThemeShadowed | undefined;
        size?: import("../../types").ThemeSize | undefined;
        theme?: import("../../types").ThemeColor | undefined;
        transitioned?: boolean | undefined;
        bordered?: boolean | undefined;
        disabled?: boolean | undefined;
        variant?: import("..").ButtonVariant | undefined;
        dropshadowed?: import("../../types").ThemeShadowed | undefined;
        href?: string | null | undefined;
        underlined?: boolean | "hover" | undefined;
    } & {
        caret?: string | import("@iconify/svelte").IconifyIcon | null | undefined;
        roticon?: boolean | undefined;
        variant?: import("..").ButtonVariant | undefined;
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
