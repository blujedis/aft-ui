import type { HTMLTag } from '$lib/types';

export type ConditionalElementProps<T extends HTMLTag> = {
	as: T;
	condition: boolean | ((...args: any[]) => boolean);
};

export const conditionalElementDefaults: Partial<ConditionalElementProps<'div'>> = {
	as: 'div'
};
