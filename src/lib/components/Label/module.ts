import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { label } from './config';

export type LabelVariant = keyof typeof label;

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
	theme: 'light',
	variant: 'default'
};
