import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned, ThemeVariant } from '../../types';
export type InputVariant = Exclude<ThemeVariant, 'text'>;
export type InputProps = {
    disabled?: boolean;
    focused?: ThemeFocused;
    full?: boolean;
    chars?: number;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: ThemeTransitioned;
    variant?: InputVariant;
    unstyled?: boolean;
};
export declare const inputDefaults: Partial<InputProps>;
