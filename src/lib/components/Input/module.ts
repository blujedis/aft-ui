import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
	ThemeVariant
} from '$lib/types';

export type InputVariant = Exclude<ThemeVariant, 'text'>;

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
	size: 'md',
	theme: 'default',
	transitioned: true,
	variant: 'outlined'
};
