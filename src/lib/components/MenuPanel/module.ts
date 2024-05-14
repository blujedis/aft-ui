import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';

export type MenuPanelProps = {
	full?: boolean;
	bordered?: boolean;
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor; // not really used placeholder in case of future use.
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
};

export const menuPanelDefaults = {
	bordered: true,
	position: 'left',
	shadowed: 'sm',
	theme: 'default',
	transition: { start: 0.95, type: 'scale' }
};
