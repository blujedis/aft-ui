import type {
	ThemeColor,
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';
import type { checkbox } from './config';


export type CheckboxVariant = keyof typeof checkbox;

export type CheckboxProps = {
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: CheckboxVariant;
	unstyled?: boolean;
};

export const checkboxDefaults: Partial<CheckboxProps> = {
	focused: true,
	rounded: 'full',
	size: 'md',
	theme: 'default',
	variant: 'outlined'
};
