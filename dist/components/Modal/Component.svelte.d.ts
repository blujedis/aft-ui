import { SvelteComponentTyped } from "svelte";
import { type ModalTransition } from './module';
declare const __propDef: {
    props: {
        store?: {
            open: () => void;
            close: () => void;
            toggle: () => void;
            modify: (values: Partial<import("../..").DisclosureProps<{
                visible: boolean;
            }>>) => void;
            set(this: void, value: Required<import("../..").DisclosureProps<{
                visible: boolean;
            }>>): void;
            update(this: void, updater: import("svelte/store").Updater<Required<import("../..").DisclosureProps<{
                visible: boolean;
            }>>>): void;
            subscribe(this: void, run: import("svelte/store").Subscriber<Required<import("../..").DisclosureProps<{
                visible: boolean;
            }>>>, invalidate?: import("svelte/store").Invalidator<Required<import("../..").DisclosureProps<{
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
        theme?: import("../..").ThemeColor | undefined;
        transition?: ModalTransition | undefined;
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
        modify: (values: Partial<import("../..").DisclosureProps<{
            visible: boolean;
        }>>) => void;
        set(this: void, value: Required<import("../..").DisclosureProps<{
            visible: boolean;
        }>>): void;
        update(this: void, updater: import("svelte/store").Updater<Required<import("../..").DisclosureProps<{
            visible: boolean;
        }>>>): void;
        subscribe(this: void, run: import("svelte/store").Subscriber<Required<import("../..").DisclosureProps<{
            visible: boolean;
        }>>>, invalidate?: import("svelte/store").Invalidator<Required<import("../..").DisclosureProps<{
            visible: boolean;
        }>>> | undefined): import("svelte/store").Unsubscriber;
    };
}
export {};
