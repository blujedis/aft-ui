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
    disabled?: boolean | undefined;
    focused?: import("../..").ThemeFocused | undefined;
    full?: boolean | undefined;
    hovered?: boolean | undefined;
    href?: string | null | undefined;
    strong?: boolean | undefined;
    rounded?: import("../..").ThemeRounded | undefined;
    shadowed?: import("../..").ThemeShadowed | undefined;
    size?: import("../..").ThemeSize | undefined;
    theme?: "default" | "dark" | "primary" | "secondary" | "tertiary" | "danger" | "success" | "warning" | "info" | undefined;
    transitioned?: boolean | undefined;
    variant?: "text" | "filled" | "outlined" | "ghost" | undefined;
    underlined?: boolean | "hover" | undefined;
    unstyled?: boolean | undefined;
};
export {};
