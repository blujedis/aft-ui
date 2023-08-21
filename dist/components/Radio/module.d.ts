import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned } from '../../types';
export type RadioVariant = 'outlined';
export type RadioProps = {
    disabled?: boolean;
    focused?: ThemeFocused;
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: ThemeTransitioned;
    variant?: RadioVariant;
    unstyled?: boolean;
};
export declare const radioDefaults: Partial<RadioProps>;
