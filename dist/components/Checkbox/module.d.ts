import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { checkbox } from './config';
export type CheckboxVariant = keyof typeof checkbox;
export type CheckboxProps = {
    disabled?: boolean;
    focused?: ThemeFocused;
    full?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: CheckboxVariant;
    unstyled?: boolean;
};
export declare const checkboxDefaults: Partial<CheckboxProps>;
