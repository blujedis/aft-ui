import type { ElementProps, HTMLTag, SvelteConstructorProps } from '$lib/types';
import type { SvelteComponent } from 'svelte';

export type ConditionalElementProps<T extends HTMLTag | typeof SvelteComponent<any, any>> = {
	as: T;
	condition: boolean | ((...args: any[]) => boolean);
};

export const conditionalElementDefaults: Partial<ConditionalElementProps<'div'>> = {
	as: 'div'
};
