import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/theme';
import type { EasingFunction, TransitionConfig } from 'svelte/types/runtime/transition';
import type { modal } from './config';
import { SvelteComponentTyped } from 'svelte';
import type { DisclosureMethods } from '$lib/stores';

export class ModalComponent extends SvelteComponentTyped<ModalProps> {
	disclosure?: DisclosureMethods;
}

export type ModalVariant = keyof typeof modal;

export type ModalPosition =
	| 'top'
	| 'center'
	| 'bottom'
	| 'top-right'
	| 'bottom-right'
	| 'top-left'
	| 'bottom-left'
	| 'top-center'
	| 'center-center'
	| 'bottom-center';

export interface TransitionParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	start?: number;
	y?: number;
}

export type TransitionHandler = <O extends TransitionParams>(
	node: Element,
	options?: O
) => TransitionConfig;

export type ModalTransition = 'fade' | 'announce' | 'zoom' | 'reveal' | 'none' | TransitionHandler;

export type ModalProps = {
	abortable?: boolean; // when true can escape or click background to abort.
	backdrop?: string | boolean;
	content?: typeof SvelteComponentTyped<Record<string, unknown>>;
	contentProps?: Record<string, unknown>;
	escapable?: boolean;
	focustrap?: boolean;
	labelby?: string;
	position?: ModalPosition;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor;
	transition?: ModalTransition;
	variant?: ModalVariant;
	visible?: boolean;
	unmount?: boolean;
	unstyled?: boolean;
	onClose?: () => void;
};

export const transitions = {
	fade: { duration: 200, start: 0.5 },
	zoom: { duration: 200, start: 0.95 },
	announce: { duration: 400, y: -600 },
	reveal: { duration: 400, y: 600 },
	none: { duration: 0 }
};

export const modalDefaults: Partial<ModalProps> = {
	backdrop: true,
	labelby: 'Modal',
	rounded: 'md',
	shadowed: 'lg',
	theme: 'default',
	variant: 'default',
	unmount: true
};
