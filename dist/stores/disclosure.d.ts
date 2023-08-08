/// <reference types="svelte" />
import { type Writable } from 'svelte/store';
interface DisclosureBaseOptions {
    visible?: boolean;
}
export type DisclosureStoreOptions<P extends Record<string, unknown> = Record<string, unknown>> = DisclosureBaseOptions & P;
export interface DisclosureMethods<P extends Record<string, unknown> = Record<string, unknown>> {
    open: () => void;
    close: () => void;
    toggle: () => void;
    modify: (values: Partial<DisclosureStoreOptions<P>>) => void;
}
export type DisclosureStore<P extends Record<string, unknown> = Record<string, unknown>> = Writable<DisclosureStoreOptions<P>> & DisclosureMethods<P>;
export declare function useDisclosure<P extends Record<string, unknown> = Record<string, unknown>>(props?: DisclosureStoreOptions<P>): {
    open: () => void;
    close: () => void;
    toggle: () => void;
    modify: (values: Partial<DisclosureStoreOptions<P>>) => void;
    set(this: void, value: Required<DisclosureStoreOptions<P>>): void;
    update(this: void, updater: import("svelte/store").Updater<Required<DisclosureStoreOptions<P>>>): void;
    subscribe(this: void, run: import("svelte/store").Subscriber<Required<DisclosureStoreOptions<P>>>, invalidate?: import("svelte/store").Invalidator<Required<DisclosureStoreOptions<P>>> | undefined): import("svelte/store").Unsubscriber;
};
export {};
