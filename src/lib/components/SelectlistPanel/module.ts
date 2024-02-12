import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';

// import type { SelectListVariant } from '../SelectListButton';

export type SelectListPanelProps = {
	origin?: 'left' | 'right' | 'center';
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor; // not really used placeholder in case of future use.
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
	// variant?: SelectListVariant;
};

export const selectListPanelDefaults = {
	origin: 'center',
	position: 'left',
	shadowed: 'md',
	theme: 'default',
	transition: { start: 0.95, type: 'scale' },
	// variant: 'outlined'
};
