import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { popover } from '../configs';
export type PopoverVariant = keyof typeof popover;
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
