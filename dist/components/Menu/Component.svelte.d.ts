import { SvelteComponent } from "svelte";
import { type MenuProps } from './module';
import type { MenuGlobalProps } from './';
declare const __propDef: {
    props: {
        store?: {
            open: () => void;
            close: () => void;
            toggle: () => void;
            modify: (values: Partial<import("../../stores").DisclosureStoreOptions<{
                visible: boolean;
            }>>) => void;
            set(this: void, value: Required<import("../../stores").DisclosureStoreOptions<{
                visible: boolean;
            }>>): void;
            update(this: void, updater: import("svelte/store").Updater<Required<import("../../stores").DisclosureStoreOptions<{
                visible: boolean;
            }>>>): void;
            subscribe(this: void, run: import("svelte/store").Subscriber<Required<import("../../stores").DisclosureStoreOptions<{
                visible: boolean;
            }>>>, invalidate?: import("svelte/store").Invalidator<Required<import("../../stores").DisclosureStoreOptions<{
                visible: boolean;
            }>>> | undefined): import("svelte/store").Unsubscriber;
        } | undefined;
    } & MenuProps & MenuGlobalProps & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            visible: boolean;
            open: () => void;
            close: () => void;
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
        modify: (values: Partial<import("../../stores").DisclosureStoreOptions<{
            visible: boolean;
        }>>) => void;
        set(this: void, value: Required<import("../../stores").DisclosureStoreOptions<{
            visible: boolean;
        }>>): void;
        update(this: void, updater: import("svelte/store").Updater<Required<import("../../stores").DisclosureStoreOptions<{
            visible: boolean;
        }>>>): void;
        subscribe(this: void, run: import("svelte/store").Subscriber<Required<import("../../stores").DisclosureStoreOptions<{
            visible: boolean;
        }>>>, invalidate?: import("svelte/store").Invalidator<Required<import("../../stores").DisclosureStoreOptions<{
            visible: boolean;
        }>>> | undefined): import("svelte/store").Unsubscriber;
    };
}
export {};
