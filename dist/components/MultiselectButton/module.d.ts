import type { multiselectButton } from './config';
import type { IconifyIcon } from '@iconify/svelte';
import { type InputProps } from '../Input';
export type MultiselectButtonVariant = keyof typeof multiselectButton;
export type MultiselectButtonProps = InputProps & {
    caret?: string | IconifyIcon;
    filterable?: boolean;
    newable?: boolean;
    removable?: boolean;
    roticon?: boolean;
    tags?: boolean;
    variant?: MultiselectButtonVariant;
};
export declare const multiselectButtonDefaults: {
    caret: string;
    placeholder: string;
    roticon: boolean;
    variant: string;
    disabled?: boolean | undefined;
    focused?: any;
    full?: boolean | undefined;
    chars?: number | undefined;
    rounded?: any;
    shadowed?: any;
    size?: any;
    theme?: any;
    transitioned?: any;
    unstyled?: boolean | undefined;
};
