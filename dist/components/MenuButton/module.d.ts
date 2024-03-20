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
    bordered?: boolean | undefined;
    disabled?: boolean | undefined;
    dropshadowed?: import("../..").ThemeShadowed | undefined;
    focused?: import("../..").ThemeFocused | undefined;
    full?: boolean | undefined;
    hovered?: boolean | undefined;
    href?: string | null | undefined;
    rounded?: import("../..").ThemeRounded | undefined;
    shadowed?: import("../..").ThemeShadowed | undefined;
    size?: import("../..").ThemeSize | undefined;
    theme?: import("../..").ThemeColor | undefined;
    transitioned?: boolean | undefined;
    variant?: ButtonVariant | undefined;
    underlined?: boolean | "hover" | undefined;
};
export {};
