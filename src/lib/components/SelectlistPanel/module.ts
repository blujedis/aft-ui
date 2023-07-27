import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
import type { selectListPanel } from './config';

export type SelectListPanelVariant = keyof typeof selectListPanel;

export type SelectListPanelProps = {
	origin?: 'left' | 'right' | 'center';
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor; // not really used placeholder in case of future use.
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
	variant?: SelectListPanelVariant;
};

export const selectListPanelDefaults = {
	origin: 'center',
	position: 'left',
	shadowed: 'md',
	theme: 'light',
	transition: { start: 0.95, type: 'scale' },
	variant: 'default'
};
