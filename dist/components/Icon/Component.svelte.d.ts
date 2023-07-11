import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        id?: string | undefined;
        style?: string | undefined;
        icon: string | import("@iconify/svelte").IconifyIcon;
        mode?: import("@iconify/svelte").IconifyRenderMode | undefined;
        color?: string | undefined;
        flip?: string | undefined;
        rotate?: number | undefined;
        hFlip?: boolean | undefined;
        vFlip?: boolean | undefined;
        width?: import("@iconify/svelte").IconifyIconSize | undefined;
        height?: import("@iconify/svelte").IconifyIconSize | undefined;
        inline?: boolean | undefined;
        class?: string | undefined;
        size?: any;
        unstyled?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponentTyped<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
