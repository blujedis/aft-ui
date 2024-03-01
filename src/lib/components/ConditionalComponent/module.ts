import type { SvelteComponent } from 'svelte';

export type ConditionalComponentProps<T extends typeof SvelteComponent<any>> = {
	as: T;
	condition: boolean | ((...args: any[]) => boolean);
};

export const conditionaComponentDefaults: Partial<ConditionalComponentProps<any>> = {};
