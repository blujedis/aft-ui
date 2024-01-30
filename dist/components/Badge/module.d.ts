import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { badge } from './config';
export type BadgeVariant = keyof typeof badge;
export type BadgeProps = {
    full?: boolean;
    removable?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: BadgeVariant;
    unstyled?: boolean;
};
export declare const badgeDefaults: Partial<BadgeProps>;
