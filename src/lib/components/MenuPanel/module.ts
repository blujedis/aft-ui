import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
import type { menuPanel } from './config';

export type MenuPanelVariant = keyof typeof menuPanel;

export type MenuPanelProps = {
	origin?: 'left' | 'right' | 'center';
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor; // not really used placeholder in case of future use.
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
	variant?: MenuPanelVariant;
};

export const menuPanelDefaults = {
	origin: 'center',
	position: 'left',
	shadowed: 'md',
	theme: 'frame',
	transition: { start: 0.95, type: 'scale' },
	variant: 'default'
};
