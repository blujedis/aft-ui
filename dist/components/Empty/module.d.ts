import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned } from '../../types';
export type EmptyVariant = 'outlined';
export type EmptyProps = {
    as?: 'button' | 'link' | 'div' | 'span' | 'label';
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: ThemeTransitioned;
    variant?: EmptyVariant;
    unstyled?: boolean;
};
export declare const emptyDefaults: Partial<EmptyProps>;
