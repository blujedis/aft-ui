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
            key?: string | undefined;
            group?: string | undefined;
            icon?: string | import("@iconify/svelte").IconifyIcon | undefined;
            description: string;
            dismissible?: boolean | undefined;
            duration?: number | undefined;
            title?: string | undefined;
            theme?: import("../../types").ThemeColor | undefined;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
}
export {};
