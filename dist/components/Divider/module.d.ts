import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type DividerProps = {
    dropshadowed?: ThemeShadowed;
    orientation?: 'horizontal' | 'vertical' | 'h' | 'v';
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
};
export declare const dividerDefaults: Partial<DividerProps>;
