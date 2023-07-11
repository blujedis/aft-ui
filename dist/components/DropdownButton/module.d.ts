import type { IconifyIcon } from '@iconify/svelte';
import { type ButtonProps } from '../Button/module';
export type DropdownButtonProps<Tag extends 'button' | 'a'> = ButtonProps<Tag> & {
    caret?: null | string | IconifyIcon;
    placeholder?: string;
    roticon?: string | boolean;
};
export declare const dropdownButtonDefaults: DropdownButtonProps<'button'>;
