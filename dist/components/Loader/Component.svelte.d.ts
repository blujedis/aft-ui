import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        style?: string | undefined;
        color?: string | undefined;
        unstyled?: boolean | undefined;
        size?: any;
        class?: string | undefined;
        height?: import("@iconify/svelte").IconifyIconSize | undefined;
        width?: import("@iconify/svelte").IconifyIconSize | undefined;
        id?: string | undefined;
        inline?: boolean | undefined;
        mode?: import("@iconify/svelte").IconifyRenderMode | undefined;
        flip?: string | undefined;
        rotate?: number | undefined;
        hFlip?: boolean | undefined;
        vFlip?: boolean | undefined;
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
export default class Component extends SvelteComponentTyped<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
