import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type LabelProps = {
    full?: boolean;
    inline?: boolean;
    rounded?: ThemeRounded;
    dropshadowed?: ThemeShadowed;
    reversed?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor;
    visible?: boolean;
};
export declare const labelDefaults: Partial<LabelProps>;
