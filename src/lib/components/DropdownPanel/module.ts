import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
import type { dropdownPanel } from './config';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';

export type DropdownPanelVariant = keyof typeof dropdownPanel;

export type DropdownPanelProps = {
	focustrap?: boolean;
	origin?: 'left' | 'right' | 'center';
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor; // not really used placeholder in case of future use.
	transition?: DisclosureTransitionOption | (Record<string, any> & { type: DisclosureTransition });
	variant?: DropdownPanelVariant;
	visible?: boolean;
	unmount?: boolean;
	width?: string;
};

export const dropdownPanelDefaults: Partial<DropdownPanelProps> = {
	focustrap: true,
	origin: 'left',
	position: 'left',
	shadowed: 'lg',
	theme: 'default',
	transition: { start: 0.95, type: 'scale' },
	variant: 'default',
	visible: false,
	unmount: true,
	width: 'w-40'
};
