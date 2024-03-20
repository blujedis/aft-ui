import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type TileVariant = 'filled' | 'outlined' | 'soft';
export type TileProps = {
    bordered?: boolean;
    dropshadowed?: ThemeShadowed;
    focused?: boolean;
    full?: boolean;
    href?: string;
    hovered?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: TileVariant;
};
export declare const tileDefaults: Partial<TileProps>;
