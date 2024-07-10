import type { DisclosureStore } from '../../stores';
import type { HTMLTag, ElementProps } from '../../types';
import type { BlurParams, FadeParams, FlyParams, ScaleParams, SlideParams } from 'svelte/transition';
import { fly, fade, scale, blur, slide, crossfade } from 'svelte/transition';
export type DisclosureContext = DisclosureStore<{
    panel?: HTMLElement;
}> & {
    focustrap: boolean;
    transition: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
};
export type DisclosureProps<S extends DisclosureStore = DisclosureStore, T extends HTMLTag = 'div'> = {
    as?: T;
    autoclose?: boolean;
    escapable?: boolean;
    opened?: boolean;
    store?: S;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
};
export type DisclosureNativeProps<T extends HTMLTag> = ElementProps<T>;
export declare const disclosureDefaults: DisclosureProps;
export type DisclosureTransitionOption = keyof typeof disclosureTransitionOptions;
export type DisclosureTransition = keyof typeof disclosureTransitions;
export declare const disclosureTransitions: {
    fly: typeof fly;
    fade: typeof fade;
    scale: typeof scale;
    blur: typeof blur;
    slide: typeof slide;
    crossfade: typeof crossfade;
};
export declare const disclosureTransitionOptions: {
    none: Record<string, any>;
    dissolve: FadeParams;
    focus: BlurParams;
    expand: SlideParams;
    swipe: SlideParams;
    zoom: ScaleParams;
    announce: FlyParams;
    reveal: FlyParams;
};
export declare function transitioner(node: Element, options: (Record<string, any> & {
    type: DisclosureTransition;
}) | DisclosureTransitionOption): any;
