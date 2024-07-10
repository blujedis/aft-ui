import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';

export type SelectListPanelProps = {
	bordered?: boolean;
	full?: boolean;
	tags?: boolean;
	recordless?: boolean; // when no records are present as options e.g filtered is empty.
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor; // not really used placeholder in case of future use.
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
};

export const selectListPanelDefaults: SelectListPanelProps = {
	bordered: true,
	position: 'left',
	recordless: true,
	shadowed: 'sm',
	theme: 'frame',
	transition: 'none' // { start: 0.95, type: 'scale' }
};
