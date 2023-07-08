import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../theme';
import type { ScaleParams } from 'svelte/transition';
import type { dropdownPanel } from './config';
export type DropdownPanelVariant = keyof typeof dropdownPanel;
export type DropdownPanelProps = ScaleParams & {
	focustrap?: boolean;
	position?: 'left' | 'right';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	theme?: ThemeColor;
	variant?: DropdownPanelVariant;
	visible?: boolean;
	unmount?: boolean;
	width?: string;
};
export declare const dropdownPanelDefaults: Partial<DropdownPanelProps>;
