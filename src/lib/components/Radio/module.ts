import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { radio } from './config';

export type RadioVariant = keyof typeof radio;

export type RadioProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: RadioVariant;
	unstyled?: boolean;
};

export const radioDefaults: Partial<RadioProps> = {
	focused: true,
	rounded: 'full',
	size: 'md',
	theme: 'default',
	variant: 'outlined'
};
