import type { HTMLTag } from '../../types';
import type { SvelteComponent } from 'svelte';
export type ConditionalElementProps<T extends HTMLTag | typeof SvelteComponent<any, any>> = {
    as: T;
    condition: boolean | ((...args: any[]) => boolean);
};
export declare const conditionalElementDefaults: Partial<ConditionalElementProps<'div'>>;
