import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
export type CheckboxVariant = 'outlined';
export type CheckboxProps = {
    checked?: boolean;
    disabled?: boolean;
    focused?: ThemeFocused;
    full?: boolean;
    hovered?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: CheckboxVariant;
    unstyled?: boolean;
};
export declare const checkboxDefaults: Partial<CheckboxProps>;
