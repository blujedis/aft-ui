import type { SvelteComponent, ComponentProps } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type PrimitiveValue = string | number | boolean | undefined | null;
export type ClassArgument = PrimitiveValue | Record<string, unknown>;
export type HTMLTag = keyof SvelteHTMLElements; // keyof HTMLElementTagNameMap;
export type ElementProps<K extends HTMLTag> = SvelteHTMLElements[K];
export type TypeOrKey<Keys extends string | number | symbol> = Keys | (string & { value?: any });

/**
 * Interface of overridden props.
 */
export interface ElementOverrideProps {
	class?: ClassArgument | ClassArgument[];
}

/**
 * Picks element with optional exclude element attributes.
 */
export type PickNativeProps<
	K extends HTMLTag,
	E extends keyof ElementProps<K> | undefined = undefined
> = E extends undefined
	? ElementProps<K>
	: Pick<ElementProps<K>, Exclude<keyof ElementProps<K>, E>>;

/**
 * Gets type reference to native element props.
 */
export type ElementNativeProps<
	T extends HTMLTag,
	A extends keyof ElementProps<T> | undefined = undefined
> = PickNativeProps<T, A> & ElementOverrideProps;

export type SvelteConstructorProps<T extends typeof SvelteComponent<any>> = ComponentProps<
	InstanceType<T>
>;

export type TypedComponent<T extends Record<string, unknown> = Record<string, unknown>> = {
	component: new (...args: unknown[]) => SvelteComponent<T>;
};
