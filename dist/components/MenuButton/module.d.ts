import { type ButtonProps, type ButtonVariant } from '../Button';
import type { IconifyIcon } from '@iconify/svelte';
export type MenuButtonVariant = ButtonVariant;
type ButtonPropsBase = Omit<ButtonProps<'button'>, 'as' | 'focused'>;
export type MenuButtonProps = ButtonPropsBase & {
    caret?: null | string | IconifyIcon;
    roticon?: boolean;
    variant?: MenuButtonVariant;
};
export declare const menuButtonDefaults: {
    caret: string;
    roticon: boolean;
    as?: "button" | undefined;
    bordered?: boolean;
    disabled?: boolean;
    dropshadowed?: import("../..").ThemeShadowed;
    focused?: import("../..").ThemeFocused;
    full?: boolean;
    hovered?: boolean;
    href?: string | null;
    rounded?: import("../..").ThemeRounded;
    shadowed?: import("../..").ThemeShadowed;
    size?: import("../..").ThemeSize;
    theme?: import("../..").ThemeColor;
    transitioned?: boolean;
    variant?: ButtonVariant;
    underlined?: boolean | "hover";
};
export {};
