import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';

export type SelectListPanelProps = {
	full?: boolean;
	multiple?: boolean;
	origin?: 'left' | 'right' | 'center';
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor; // not really used placeholder in case of future use.
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
};

export const selectListPanelDefaults = {
	origin: 'center',
	position: 'left',
	shadowed: 'md',
	theme: 'frame',
	transition: { start: 0.95, type: 'scale' }
};
