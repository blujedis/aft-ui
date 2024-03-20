import { SvelteComponent } from "svelte";
import { type DisclosureProps } from './module';
import type { HTMLTag } from '../../types';
import { type DisclosureStore } from '../../stores';
declare class __sveltets_Render<Tag extends HTMLTag> {
    props(): {
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
    } & DisclosureProps<DisclosureStore, keyof import("svelte/elements").SvelteHTMLElements> & {
        [name: string]: any;
    };
    events(): {} & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        default: {
            open: () => void;
            close: () => void;
            toggle: () => void;
            visible: boolean;
        };
    };
}
export type ComponentProps<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['props']>;
export type ComponentEvents<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['events']>;
export type ComponentSlots<Tag extends HTMLTag> = ReturnType<__sveltets_Render<Tag>['slots']>;
export default class Component<Tag extends HTMLTag> extends SvelteComponent<ComponentProps<Tag>, ComponentEvents<Tag>, ComponentSlots<Tag>> {
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
    } & import("svelte/store").Writable<import("../../stores").DisclosureStoreOptions<Record<string, unknown>>> & import("../../stores").DisclosureMethods<Record<string, unknown>>;
}
export {};
