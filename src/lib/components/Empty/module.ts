import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type EmptyVariant = 'outlined';

export type EmptyProps = {
	as?: 'button' | 'link' | 'div' | 'span' | 'label';
	focused?: bolean;
	full?: boolean;
	hovered?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: EmptyVariant;
	unstyled?: boolean;
};

export const emptyDefaults: Partial<EmptyProps> = {
	as: 'div',
	size: 'md',
	variant: 'outlined'
};
