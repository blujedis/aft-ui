import { SvelteComponent } from "svelte";
/**
     * https://github.com/mzohaibqc/svelte-toasts/blob/main/src/ToastContainer.svelte
     */
import { type NotificationsProps } from './module';
declare const __propDef: {
    props: NotificationsProps & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            key?: string;
            group?: string;
            icon?: string | import("@iconify/svelte").IconifyIcon;
            description: string;
            dismissible?: boolean;
            duration?: number;
            title?: string;
            theme?: import("../../types").ThemeColor;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
