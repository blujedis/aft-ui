import type { IconifyIcon } from '@iconify/svelte';
import type { SvelteComponent, ComponentProps } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import type {
	BlurParams,
	CrossfadeParams,
	DrawParams,
	FadeParams,
	FlyParams,
	ScaleParams,
	SlideParams,
	TransitionConfig
} from 'svelte/transition';

export type PrimitiveValue = string | number | boolean | undefined | null;
export type ClassArgument = PrimitiveValue | Record<string, unknown>;
export type HTMLTag = keyof SvelteHTMLElements;
export type ElementProps<K extends HTMLTag> = SvelteHTMLElements[K];
export type TypeOrKey<Keys extends string | number | symbol> = Keys | (string & { value?: any });

export type ElementHandler<
	T extends HTMLElement,
	E extends Event = Event,
	U extends Record<string, any> = Record<string, any>
> = E & {
	currentTarget: EventTarget & T;
} & U;

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
> = PickNativeProps<T, A>;

// export type SvelteConstructorProps<T extends typeof SvelteComponent<any, any>> = ComponentProps<
// 	InstanceType<T>
// >;
export type SvelteConstructorProps<T extends typeof SvelteComponent> = ComponentProps<
	InstanceType<T>
>;

export type TypedComponent<T extends Record<string, unknown> = Record<string, unknown>> = {
	component: new (...args: unknown[]) => SvelteComponent<T>;
};

export type Transition = 'fade' | 'blur' | 'fly' | 'slide' | 'scale' | 'draw' | 'crossfade';

export interface TransitionMap {
	fade: FadeParams;
	blur: BlurParams;
	fly: FlyParams;
	slide: SlideParams;
	scale: ScaleParams;
	draw: DrawParams;
	crossfade: CrossfadeParams;
}

export type TransitionHandler = (node: Element, options?: Record<string, any>) => TransitionConfig;

export type Iconify = string | IconifyIcon | [string | IconifyIcon, (string | IconifyIcon)?];

export type IconifyTuple = [string | IconifyIcon, string | IconifyIcon];
