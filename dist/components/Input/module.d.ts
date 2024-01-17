import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned } from '../../types';
import type { input } from './config';
export type InputVariant = keyof typeof input;
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
