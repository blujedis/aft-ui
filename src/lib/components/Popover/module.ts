import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { popover } from '../configs';

export type PopoverVariant = keyof typeof popover;

export type PopoverProps = {
	close?: () => void;
	arrowed?: boolean;
	content?: string;
	rounded?: ThemeRounded;
	sanitizer?: (value: string) => string; // only allow @html when sanitized.
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	unstyled?: boolean;
	variant?: PopoverVariant;
};

export const popoverDefaults: PopoverProps = {
	shadowed: 'md',
	size: 'md',
	theme: 'default',
	variant: 'filled'
};
