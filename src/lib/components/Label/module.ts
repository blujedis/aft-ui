import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type LabelProps = {
	full?: boolean;
	inline?: boolean;
	rounded?: ThemeRounded;
	dropshadowed?: ThemeShadowed;
	reversed?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	visible?: boolean;
};

export const labelDefaults: Partial<LabelProps> = {
	visible: true
};
