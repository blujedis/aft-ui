import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

// export type PopoverVariant = 'filled';

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
};

export const popoverDefaults: PopoverProps = {
	shadowed: 'md',
	size: 'md',
	theme: 'frame'
};
