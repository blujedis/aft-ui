import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize, ThemeVariant } from '../../types';
export type PopoverVariant = Exclude<ThemeVariant, 'text' | 'flushed' | 'ghost'>;
export type PopoverProps = {
    close?: () => void;
    arrowed?: boolean;
    content?: string;
    rounded?: ThemeRounded;
    sanitizer?: (value: string) => string;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    unstyled?: boolean;
    variant?: PopoverVariant;
};
export declare const popoverDefaults: PopoverProps;
