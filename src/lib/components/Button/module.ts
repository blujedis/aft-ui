import type {
	ThemeFocused,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
	ThemeColor,
	ThemeVariant
} from '$lib/types';

export type ButtonVariant = Exclude<ThemeVariant, 'flushed'>;

export type ButtonProps<Tag extends 'button' | 'a'> = {
	as?: Tag;
	disabled?: boolean;
	focused?: ThemeFocused;
	full?: boolean;
	href?: string | null;
	strong?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: ButtonVariant;
	underlined?: boolean | 'hover'; // when hover only shown when hovering.
	unstyled?: boolean;
};

export const buttonDefaults: Partial<ButtonProps<'button'>> = {
	size: 'md',
	theme: 'default',
	variant: 'filled'
};
