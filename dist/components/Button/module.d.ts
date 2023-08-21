import type { ThemeFocused, ThemeRounded, ThemeShadowed, ThemeSize, ThemeTransitioned, ThemeColor, ThemeVariant } from '../../types';
export type ButtonVariant = Exclude<ThemeVariant, 'flushed'>;
export type ButtonProps<Tag extends 'button' | 'a'> = {
    as?: Tag;
    disabled?: boolean;
    focused?: ThemeFocused;
    full?: boolean;
    href?: string | null;
    strong?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: ThemeTransitioned;
    variant?: ButtonVariant;
    underlined?: boolean | 'hover';
    unstyled?: boolean;
};
export declare const buttonDefaults: Partial<ButtonProps<'button'>>;
