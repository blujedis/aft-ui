import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import { SvelteComponent } from 'svelte';
import type { DisclosureMethods } from '$lib/stores';
import {
	disclosureTransitions,
	type DisclosureTransitionOption,
	type DisclosureTransition
} from '../Disclosure';

export class ModalComponent extends SvelteComponent<ModalProps> {
	disclosure?: DisclosureMethods;
}

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

export type ModalTransition = DisclosureTransitionOption;

export type ModalProps = {
	abortable?: boolean; // when true can escape or click background to abort.
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
	transition?: ModalTransition | (Record<string, any> & { type: DisclosureTransition });
	visible?: boolean;
	unmount?: boolean;
	unstyled?: boolean;
	onClose?: () => void;
};

export const transitions = {
	...disclosureTransitions,
	zoom: { duration: 200, start: 0.925, type: 'scale' },
	swipe: { duration: 200, axis: 'y', type: 'slide' },
	dissolve: { duration: 200, start: 0.8, type: 'fade' }
	// fade: { duration: 200, start: 0.5 },
	// zoom: { duration: 200, start: 0.925 },
	// announce: { duration: 400, y: -300 },
	// reveal: { duration: 400, y: 300 },
	// none: { duration: 0 }
};

export const modalDefaults: Partial<ModalProps> = {
	backdrop: true,
	labelby: 'Modal',
	rounded: 'md',
	shadowed: 'lg',
	theme: 'default',
	unmount: true
};
