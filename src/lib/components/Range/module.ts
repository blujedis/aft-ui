import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type RangeProps = {
	focused?: ThemeFocused;
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
};

export const rangeDefaults: RangeProps = {
	size: 'md',
	theme: 'frame'
};
