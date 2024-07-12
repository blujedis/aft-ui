import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type RangeProps = {
    focused?: ThemeFocused;
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
};
export declare const rangeDefaults: RangeProps;
