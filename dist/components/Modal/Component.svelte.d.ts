import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        store?: {
            open: () => void;
            close: () => void;
            toggle: () => void;
            modify: (values: Partial<import("../..").DisclosureStoreOptions<{
                visible: boolean;
            }>>) => void;
            set(this: void, value: Required<import("../..").DisclosureStoreOptions<{
                visible: boolean;
            }>>): void;
            update(this: void, updater: import("svelte/store").Updater<Required<import("../..").DisclosureStoreOptions<{
                visible: boolean;
            }>>>): void;
            subscribe(this: void, run: import("svelte/store").Subscriber<Required<import("../..").DisclosureStoreOptions<{
                visible: boolean;
            }>>>, invalidate?: import("svelte/store").Invalidator<Required<import("../..").DisclosureStoreOptions<{
                visible: boolean;
            }>>> | undefined): import("svelte/store").Unsubscriber;
        } | undefined;
        abortable?: boolean | undefined;
        backdrop?: string | boolean | undefined;
        content?: {
            new (options: import("svelte").ComponentConstructorOptions<Record<string, unknown>>): import("svelte").SvelteComponent<Record<string, unknown>, any, any>;
        } | undefined;
        contentProps?: Record<string, unknown> | undefined;
        escapable?: boolean | undefined;
        focustrap?: boolean | undefined;
        labelby?: string | undefined;
        position?: import("../..").ModalPosition | undefined;
        rounded?: import("../..").ThemeRounded | undefined;
        shadowed?: import("../..").ThemeShadowed | undefined;
        theme?: "light" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info" | undefined;
        transition?: "none" | "focus" | "dissolve" | "expand" | "swipe" | "zoom" | "announce" | "reveal" | (Record<string, any> & {
            type: "fade" | "blur" | "fly" | "slide" | "scale" | "crossfade";
        }) | undefined;
        variant?: "default" | "filled" | undefined;
        visible?: boolean | undefined;
        unmount?: boolean | undefined;
        unstyled?: boolean | undefined;
        onClose?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        backdrop: {};
        default: {
            visible: boolean;
            close: () => void;
            open: () => void;
            toggle: () => void;
        };
    };
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponentTyped<ComponentProps, ComponentEvents, ComponentSlots> {
    get store(): {
        open: () => void;
        close: () => void;
        toggle: () => void;
        modify: (values: Partial<import("../..").DisclosureStoreOptions<{
            visible: boolean;
        }>>) => void;
        set(this: void, value: Required<import("../..").DisclosureStoreOptions<{
            visible: boolean;
        }>>): void;
        update(this: void, updater: import("svelte/store").Updater<Required<import("../..").DisclosureStoreOptions<{
            visible: boolean;
        }>>>): void;
        subscribe(this: void, run: import("svelte/store").Subscriber<Required<import("../..").DisclosureStoreOptions<{
            visible: boolean;
        }>>>, invalidate?: import("svelte/store").Invalidator<Required<import("../..").DisclosureStoreOptions<{
            visible: boolean;
        }>>> | undefined): import("svelte/store").Unsubscriber;
    };
}
export {};
