import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
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
};
export declare const popoverDefaults: PopoverProps;
