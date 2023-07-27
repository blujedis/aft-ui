import type { menuButton } from './config';
import { type ButtonProps } from '../Button';
import type { IconifyIcon } from '@iconify/svelte';
export type MenuButtonVariant = keyof typeof menuButton;
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
    disabled?: boolean | undefined;
    focused?: import("../..").ThemeFocused | undefined;
    full?: boolean | undefined;
    href?: string | null | undefined;
    strategy?: "button" | "text" | undefined;
    rounded?: import("../..").ThemeRounded | undefined;
    shadowed?: import("../..").ThemeShadowed | undefined;
    size?: import("../..").ThemeSize | undefined;
    theme?: "light" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info" | undefined;
    transitioned?: boolean | undefined;
    variant?: "text" | "default" | "filled" | "outlined" | "ghost" | undefined;
    unstyled?: boolean | undefined;
};
export {};
