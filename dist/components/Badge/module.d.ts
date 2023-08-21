import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned, ThemeVariant } from '../../types';
export type BadgeVariant = Exclude<ThemeVariant, 'text' | 'flushed'>;
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
export declare const badgeDefaults: Partial<BadgeProps>;
