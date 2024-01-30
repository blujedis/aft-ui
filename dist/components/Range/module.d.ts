import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { rangeTrackBackground } from './config';
export type RangeVariant = keyof typeof rangeTrackBackground;
export type RangeProps = {
    focused?: ThemeFocused;
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: RangeVariant;
};
export declare const rangeDefaults: RangeProps;
