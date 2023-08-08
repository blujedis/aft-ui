import type { ElementProps, HTMLTag, SvelteConstructorProps } from '$lib/types';
import type { SvelteComponent } from 'svelte';

export type ConditionalElementProps<T extends HTMLTag | typeof SvelteComponent> = {
	as?: T;
	condition: boolean | ((...args: any[]) => boolean);
	props?: T extends typeof SvelteComponent
		? SvelteConstructorProps<T>
		: T extends HTMLTag
		? ElementProps<T>
		: never;
};

export const conditionalElementDefaults: Partial<ConditionalElementProps<'div'>> = {
	as: 'div'
};
