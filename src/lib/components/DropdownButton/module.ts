import type { IconifyIcon } from '@iconify/svelte';
import { type ButtonProps, buttonDefaults } from '../Button/module';

export type DropdownButtonProps<Tag extends 'button' | 'a'> = ButtonProps<Tag> & {
	caret?: null | string | IconifyIcon;
	placeholder?: string;
	roticon?: string | boolean;
};

export const dropdownButtonDefaults: DropdownButtonProps<'button'> = {
	...buttonDefaults,
	caret: 'octicon:chevron-down-24', // 'mdi:chevron-down', //  mdi:unfold-more-horizontal
	placeholder: 'Please Select',
	roticon: true
};
