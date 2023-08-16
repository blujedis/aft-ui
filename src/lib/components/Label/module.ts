import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';


export type LabelVariant = 'text';

export type LabelProps = {
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	dropshadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: LabelVariant;
	unstyled?: boolean;
};

export const labelDefaults: Partial<LabelProps> = {
	rounded: 'full',
	size: 'md',
	theme: 'default',
	variant: 'text'
};
