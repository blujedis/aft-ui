/**
 * Global Options
 * dropshadow: (default: none)
 */
import type { SvelteComponentTyped } from 'svelte';
import type { popover } from './config';
import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '../../theme';
export type PopoverVariant = keyof typeof popover;
export type PopoverProps = {
	arrowed?: boolean;
	content?: string | typeof SvelteComponentTyped<any> | null;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	unstyled?: boolean;
	variant?: PopoverVariant;
};
export declare const popoverDefaults: PopoverProps;
