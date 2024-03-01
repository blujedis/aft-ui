import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type KbdVariant = 'filled' | 'outlined' | 'soft';

export type KbdProps = {
	full?: boolean;
	hovered?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: KbdVariant;
};

export const kbdDefaults: Partial<KbdProps> = {
	size: 'md'
};
