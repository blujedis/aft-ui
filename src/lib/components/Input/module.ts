import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { input } from './config';

export type InputVariant = keyof typeof input;

export type InputProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	chars?: number; // mapped to native "size" attribute
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: InputVariant;
	unstyled?: boolean;
};

export const inputDefaults: Partial<InputProps> = {
	focused: 'always',
	size: 'md',
	theme: 'light',
	transitioned: true,
	variant: 'default'
};
