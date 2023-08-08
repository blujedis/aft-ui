import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
import { SvelteComponent } from 'svelte';
import type { DisclosureMethods } from '../../stores';
import { type DisclosureTransitionOption, type DisclosureTransition } from '../Disclosure';
export declare class ModalComponent extends SvelteComponent<ModalProps> {
    disclosure?: DisclosureMethods;
}
export type ModalPosition = 'top' | 'center' | 'bottom' | 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' | 'top-center' | 'center-center' | 'bottom-center';
export type ModalTransition = DisclosureTransitionOption;
export type ModalProps = {
    abortable?: boolean;
    backdrop?: string | boolean;
    content?: typeof SvelteComponent<Record<string, unknown>>;
    contentProps?: Record<string, unknown>;
    escapable?: boolean;
    focustrap?: boolean;
    labelby?: string;
    position?: ModalPosition;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    theme?: ThemeColor;
    transition?: ModalTransition | (Record<string, any> & {
        type: DisclosureTransition;
    });
    visible?: boolean;
    unmount?: boolean;
    unstyled?: boolean;
    onClose?: () => void;
};
export declare const transitions: {
    zoom: {
        duration: number;
        start: number;
        type: string;
    };
    swipe: {
        duration: number;
        axis: string;
        type: string;
    };
    dissolve: {
        duration: number;
        start: number;
        type: string;
    };
    fly: typeof import("svelte/transition").fly;
    fade: typeof import("svelte/transition").fade;
    scale: typeof import("svelte/transition").scale;
    blur: typeof import("svelte/transition").blur;
    slide: typeof import("svelte/transition").slide;
    crossfade: typeof import("svelte/transition").crossfade;
};
export declare const modalDefaults: Partial<ModalProps>;
