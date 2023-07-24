import type { multiselectButton } from './config';
import { type ButtonProps } from '../Button';
import type { IconifyIcon } from '@iconify/svelte';
export type MultiselectButtonVariant = keyof typeof multiselectButton;
type ButtonPropsBase = Omit<ButtonProps<'button'>, 'as' | 'focused'>;
export type MultiselectButtonProps = ButtonPropsBase & {
    caret?: null | string | IconifyIcon;
    roticon?: boolean;
    variant?: MultiselectButtonVariant;
};
export declare const multiselectButtonDefaults: {
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
    theme?: import("../..").ThemeColor | undefined;
    transitioned?: boolean | undefined;
    variant?: "text" | "default" | "filled" | "outlined" | "ghost" | undefined;
    unstyled?: boolean | undefined;
};
export {};
