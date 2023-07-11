/// <reference types="svelte" />
import { type Writable } from 'svelte/store';
interface DisclosureBaseProps {
    visible?: boolean;
}
export type DisclosureProps<P extends Record<string, unknown> = Record<string, unknown>> = DisclosureBaseProps & P;
export interface DisclosureMethods<P extends Record<string, unknown> = Record<string, unknown>> {
    open: () => void;
    close: () => void;
    toggle: () => void;
    modify: (values: Partial<DisclosureProps<P>>) => void;
}
export type DisclosureStore<P extends Record<string, unknown> = Record<string, unknown>> = Writable<DisclosureProps<P>> & DisclosureMethods<P>;
export declare function useDisclosure<P extends Record<string, unknown> = Record<string, unknown>>(props?: DisclosureProps<P>): {
    open: () => void;
    close: () => void;
    toggle: () => void;
    modify: (values: Partial<DisclosureProps<P>>) => void;
    set(this: void, value: Required<DisclosureProps<P>>): void;
    update(this: void, updater: import("svelte/store").Updater<Required<DisclosureProps<P>>>): void;
    subscribe(this: void, run: import("svelte/store").Subscriber<Required<DisclosureProps<P>>>, invalidate?: import("svelte/store").Invalidator<Required<DisclosureProps<P>>> | undefined): import("svelte/store").Unsubscriber;
};
export {};
