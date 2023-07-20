import type { multiselectButton } from './config';
import type { IconifyIcon } from '@iconify/svelte';
import  { type InputProps, inputDefaults } from '../Input';

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

export const multiselectButtonDefaults = {
	...inputDefaults,
	caret: 'octicon:chevron-down-24', // 'mdi:chevron-down', //  mdi:unfold-more-horizontal,
	placeholder: '',
	roticon: true,
	variant: 'outlined'
};
