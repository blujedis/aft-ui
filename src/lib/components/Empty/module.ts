import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { empty } from './config';

export type EmptyVariant = keyof typeof empty;

export type EmptyProps = {
	as?: 'button' | 'link' | 'div' | 'span' | 'label';
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: EmptyVariant;
	unstyled?: boolean;
};

export const emptyDefaults: Partial<EmptyProps> = {
	as: 'div',
	size: 'md',
	theme: 'light',
	variant: 'outlined'
};
