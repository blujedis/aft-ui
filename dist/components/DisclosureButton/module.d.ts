import type { SvelteConstructorProps, HTMLTag, ElementProps } from '../../types';
import type { SvelteComponent } from 'svelte';
type DisclosureButtonTypeProps<T extends HTMLTag | typeof SvelteComponent> = T extends typeof SvelteComponent ? SvelteConstructorProps<T> : T extends HTMLTag ? ElementProps<T> : never;
export type DisclosureButtonProps<T extends HTMLTag | typeof SvelteComponent> = {
    as?: T;
} & DisclosureButtonTypeProps<T>;
export declare const disclosureButtonDefaults: DisclosureButtonProps<'button'>;
export {};
