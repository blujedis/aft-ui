import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
import type { multiselectPanel } from './config';

export type MultiselectPanelVariant = keyof typeof multiselectPanel;

export type MultiselectPanelProps = {
	origin?: 'left' | 'right' | 'center';
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor; // not really used placeholder in case of future use.
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
	variant?: MultiselectPanelVariant;
};

export const multiselectPanelDefaults = {
	origin: 'center',
	position: 'left',
	shadowed: 'md',
	theme: 'default',
	transition: { start: 0.95, type: 'scale' },
	variant: 'default'
};
