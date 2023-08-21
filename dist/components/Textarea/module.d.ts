import type { ThemeColor, ThemeFocused, ThemeResize, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned, ThemeVariant } from '../../types';
export type TextareaVariant = Exclude<ThemeVariant, 'text' | 'flushed'>;
export type TextareaProps = {
    disabled?: boolean;
    focused?: ThemeFocused;
    full?: boolean;
    resize?: ThemeResize;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: ThemeTransitioned;
    variant?: TextareaVariant;
    unstyled?: boolean;
};
export declare const textareaDefaults: Partial<TextareaProps>;
