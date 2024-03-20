import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';

export type SelectListPanelProps = {
	full?: boolean;
	tags?: boolean;
	origin?: 'left' | 'right' | 'center';
	recordless?: boolean; // when no records are present as options e.g filtered is empty.
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
