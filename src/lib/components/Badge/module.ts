import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
	ThemeVariant
} from '$lib/types';

export type BadgeVariant = Exclude<ThemeVariant, 'text' | 'flushed'>

export type BadgeProps = {
	full?: boolean;
	removable?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: BadgeVariant;
	unstyled?: boolean;
};

export const badgeDefaults: Partial<BadgeProps> = {
	size: 'md',
	theme: 'default',
	variant: 'filled'
};
