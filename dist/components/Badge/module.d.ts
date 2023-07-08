import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '../../theme';
import type { badge } from './config';
export type BadgeVariant = keyof typeof badge;
export type BadgeProps = {
	full?: boolean;
	removable?: boolean;
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	tag?: boolean;
	theme?: ThemeColor;
	transitioned?: ThemeTransitioned;
	variant?: BadgeVariant;
	unstyled?: boolean;
};
export declare const badgeDefaults: Partial<BadgeProps>;
