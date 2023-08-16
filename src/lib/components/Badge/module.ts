import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned,
	ThemeVariant
} from '$lib/types';
// import type { badge } from './config';

// export type BadgeVariant = keyof typeof badge;

export type BadgeProps = {
	full?: boolean;
	removable?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: Exclude<ThemeVariant, 'text' | 'flushed'>;
	unstyled?: boolean;
};

export const badgeDefaults: Partial<BadgeProps> = {
	size: 'md',
	theme: 'default',
	variant: 'filled'
};
