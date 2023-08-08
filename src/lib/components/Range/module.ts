import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { rangeTrackBackground } from './config';

export type RangeVariant = keyof typeof rangeTrackBackground;

export type RangeProps = {
	focused?: ThemeFocused;
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: RangeVariant;
};

export const rangeDefaults: RangeProps = {
	size: 'md',
	theme: 'light',
	variant: 'filled'
};
