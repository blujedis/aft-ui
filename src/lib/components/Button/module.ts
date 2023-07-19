import type {
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
	ThemeColor
} from '$lib/types';
import type { button } from './config';

export type ButtonVariant = keyof typeof button;

export type ButtonProps<Tag extends 'button' | 'a'> = {
	as?: Tag;
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	href?: string | null;
	strategy?: 'button' | 'text';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: ButtonVariant;
	unstyled?: boolean;
};

export const buttonDefaults: Partial<ButtonProps<'button'>> = {
	focused: 'visible',
	full: false,
	strategy: 'button',
	size: 'md',
	theme: 'default',
	variant: 'default'
};
