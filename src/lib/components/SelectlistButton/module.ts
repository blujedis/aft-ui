import type { selectListButton } from './config';
import type { IconifyIcon } from '@iconify/svelte';
import { type InputProps, inputDefaults } from '../Input';
import type { SelectListItem } from '../SelectList';

export type SelectListButtonVariant = keyof typeof selectListButton;

export type SelectListButtonProps = InputProps & {
	caret?: string | IconifyIcon;
	filterable?: boolean;
	newable?: boolean;
	placeholder?: string;
	removable?: boolean;
	roticon?: boolean;
	tags?: boolean;
	variant?: SelectListButtonVariant;
	onBeforeAdd?: <T extends SelectListItem>(value: string, input: HTMLInputElement) => T | null | false | undefined | Promise<T | null | false | undefined>;
	onBeforeRemove?: <T extends SelectListItem>(item: T, input: HTMLInputElement) => boolean | Promise<boolean>;
};

export const selectListButtonDefaults: Partial<SelectListButtonProps> = {
	...inputDefaults,
	caret: 'octicon:chevron-down-24', // 'mdi:chevron-down', //  mdi:unfold-more-horizontal,
	focused: 'alwaysWithin',
	placeholder: '',
	roticon: true,
	variant: 'default',
	onBeforeAdd: (value: string, input: HTMLInputElement) => ({ label: value, value, group: '', selected: false }) as any,
	onBeforeRemove: (item: SelectListItem, input: HTMLInputElement) => true // default just allow removal.

};
