import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type LabelProps = {
    full?: boolean;
    hovered?: boolean;
    inline?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    dropshadowed?: ThemeShadowed;
    reversed?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    visible?: boolean;
};
export declare const labelDefaults: Partial<LabelProps>;
