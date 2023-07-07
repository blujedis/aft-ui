import type { ThemeColor, ThemeRounded, ThemeShadowed } from '$lib/theme';
import type { ScaleParams } from 'svelte/transition';
import type { dropdownPanel } from './config';

export type DropdownPanelVariant = keyof typeof dropdownPanel;

export type DropdownPanelProps = ScaleParams & {
	focustrap?: boolean;
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor; // not really used placeholder in case of future use.
	variant?: DropdownPanelVariant;
	visible?: boolean;
	unmount?: boolean;
	width?: string;
};

export const dropdownPanelDefaults: Partial<DropdownPanelProps> = {
	duration: 200,
	focustrap: true,
	position: 'left',
	shadowed: 'lg',
	start: 0.95,
	theme: 'default',
	variant: 'default',
	visible: false,
	unmount: true,
	width: 'w-40'
};
