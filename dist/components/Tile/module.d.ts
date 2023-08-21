import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned, ThemeVariant } from '../../types';
export type TileVariant = Exclude<ThemeVariant, 'text' | 'flushed'>;
export type TileProps = {
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: ThemeTransitioned;
    variant?: TileVariant;
};
export declare const tileDefaults: Partial<TileProps>;
