import { SvelteComponent } from "svelte";
import { type ModalProps } from './module';
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
    } & ModalProps;
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
export default class Component extends SvelteComponent<ComponentProps, ComponentEvents, ComponentSlots> {
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
