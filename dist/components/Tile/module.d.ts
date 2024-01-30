import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { tile } from './config';
export type TileVariant = keyof typeof tile;
export type TileProps = {
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: TileVariant;
};
export declare const tileDefaults: Partial<TileProps>;
