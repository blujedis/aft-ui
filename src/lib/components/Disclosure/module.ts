import type { DisclosureStore } from '../../stores';
import type { HTMLTag, ElementProps } from '$lib/types';
import type {
	BlurParams,
	FadeParams,
	FlyParams,
	ScaleParams,
	SlideParams
} from 'svelte/transition';
import { fly, fade, scale, blur, slide, crossfade } from 'svelte/transition';

export type DisclosureContext = DisclosureStore<{ panel?: HTMLElement }> & {
	focustrap: boolean;
	transition: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
};

export type DisclosureProps<
	S extends DisclosureStore = DisclosureStore,
	T extends HTMLTag = 'div'
> = {
	as?: T;
	autoclose?: boolean;
	escapable?: boolean;
	opened?: boolean;
	store?: S;
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
};

export type DisclosureNativeProps<T extends HTMLTag> = ElementProps<T>;

export const disclosureDefaults: DisclosureProps = {
	as: 'div',
	autoclose: true,
	opened: false,
	escapable: true
};

export type DisclosureTransitionOption = keyof typeof disclosureTransitionOptions;

export type DisclosureTransition = keyof typeof disclosureTransitions;

export const disclosureTransitions = {
	fly,
	fade,
	scale,
	blur,
	slide,
	crossfade
};

export const disclosureTransitionOptions = {
	none: { duration: 0 } as unknown as Record<string, any>,
	dissolve: { duration: 200, start: 0.5, type: 'fade' } as FadeParams,
	focus: { duration: 400, amount: 5, opacity: 0, type: 'blur' } as BlurParams,
	expand: { duration: 400, axis: 'y', type: 'slide' } as SlideParams,
	swipe: { duration: 400, axis: 'x', type: 'slide' } as SlideParams,
	zoom: { duration: 200, start: 0.7, type: 'scale' } as ScaleParams,
	announce: { duration: 400, y: -300, type: 'fly' } as FlyParams,
	reveal: { duration: 400, y: 300, type: 'fly' } as FlyParams
};

export function transitioner(
	node: Element,
	options: (Record<string, any> & { type: DisclosureTransition }) | DisclosureTransitionOption
) {
	if (!options) return null as any;
	let config = options as Record<string, any> & { type: DisclosureTransition };
	if (typeof options === 'string')
		config = disclosureTransitionOptions[options] as Record<string, any> & {
			type: DisclosureTransition;
		};
	else config = options;
	const { type, ...rest } = config;
	if (!type)
		return null as any;
	return disclosureTransitions[type](node, rest);
}
