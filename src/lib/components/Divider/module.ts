import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type DividerProps = {
	dropshadowed?: ThemeShadowed;
	orientation?: 'horizontal' | 'vertical' | 'h' | 'v';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
};

export const dividerDefaults: Partial<DividerProps> = {
	theme: 'frame',
	orientation: 'h',
	size: 'sm'
};
