import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../theme';
import type { EasingFunction, TransitionConfig } from 'svelte/types/runtime/transition';
import type { modal } from './config';
import { SvelteComponent } from 'svelte';
import type { DisclosureMethods } from '../../stores';
export declare class ModalComponent extends SvelteComponent<ModalProps> {
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
	transition?: ModalTransition;
	variant?: ModalVariant;
	visible?: boolean;
	unmount?: boolean;
	unstyled?: boolean;
	onClose?: () => void;
};
export declare const transitions: {
	fade: {
		duration: number;
		start: number;
	};
	zoom: {
		duration: number;
		start: number;
	};
	announce: {
		duration: number;
		y: number;
	};
	reveal: {
		duration: number;
		y: number;
	};
	none: {
		duration: number;
	};
};
export declare const modalDefaults: Partial<ModalProps>;
