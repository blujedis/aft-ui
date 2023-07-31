import type { ElementProps, HTMLTag, SvelteConstructorProps } from '$lib/types';
import type { SvelteComponent } from 'svelte';

export type ConditionalElementTypeProps<T extends HTMLTag | typeof SvelteComponent> =
	T extends typeof SvelteComponent
		? SvelteConstructorProps<T>
		: T extends HTMLTag
		? ElementProps<T>
		: never;

export type ConditionalElementProps<T extends HTMLTag | typeof SvelteComponent> = {
	events?: boolean; // when true fwd events for container.
	as?: T;
	condition: boolean | ((...args: any[]) => boolean);
};

export const conditionalElementDefaults: Partial<ConditionalElementProps<'div'>> = {
	as: 'div'
};
