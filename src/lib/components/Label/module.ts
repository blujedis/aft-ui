import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

export type LabelProps = {
	full?: boolean;
	hovered?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	dropshadowed?: ThemeShadowed;
	reversed?: boolean;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	visible?: boolean;
};

export const labelDefaults: Partial<LabelProps> = {
	visible: true
};
