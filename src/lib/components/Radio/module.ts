import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type RadioVariant = 'outlined';

export type RadioProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	group?: any;
	hovered?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	value?: any;
	variant?: RadioVariant;
	unstyled?: boolean;
};

export const radioDefaults: Partial<RadioProps> = {
	rounded: 'full',
	size: 'md',
	variant: 'outlined'
};
