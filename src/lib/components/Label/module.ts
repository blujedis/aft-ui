import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
} from '$lib/types';

export type LabelProps = {
	full?: boolean;
	hovered?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	dropshadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
};

export const labelDefaults: Partial<LabelProps> = {
	rounded: 'full',
	size: 'md',
};
