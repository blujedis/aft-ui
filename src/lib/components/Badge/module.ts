import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
} from '$lib/types';
import type { badge } from './config';

export type BadgeVariant = keyof typeof badge;

export type BadgeProps = {
	full?: boolean;
	hovered?: boolean;
	removable?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transitioned?: boolean;
	variant?: BadgeVariant;
	unstyled?: boolean;
};

export const badgeDefaults: Partial<BadgeProps> = {
	size: 'md',
	theme: 'default',
	variant: 'filled'
};
