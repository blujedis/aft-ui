import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type InputVariant = 'outlined' | 'filled' | 'flushed' | 'soft' | 'text';

export type InputProps = {
	disabled?: boolean;
	focused?: boolean;
	full?: boolean;
	hovered?: boolean;
	chars?: number; // mapped to native "size" attribute
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: InputVariant;
};

export const inputDefaults: Partial<InputProps> = {
	size: 'md',
	theme: 'frame',
	variant: 'outlined'
};
