import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type BadgeVariant = 'filled' | 'outlined' | 'soft';
export type BadgeProps = {
    full?: boolean;
    focused?: boolean;
    hovered?: boolean;
    removable?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: BadgeVariant;
};
export declare const badgeDefaults: Partial<BadgeProps>;
