import type {
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/theme';
import type { ThemeColor } from '$lib/theme';
import type { button } from './config';

export type ButtonVariant = keyof typeof button;

export type ButtonProps<Tag extends 'button' | 'a'> = {
	as?: Tag;
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	mode?: 'button' | 'text';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	underlined?: boolean;
	variant?: ButtonVariant;
	unstyled?: boolean;
};

export const buttonDefaults: Partial<ButtonProps<'button'>> = {
	focused: 'visible',
	full: false,
	mode: 'button',
	size: 'md',
	theme: 'default',
	variant: 'default'
};
