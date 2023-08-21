import type { IconifyIcon } from '@iconify/svelte';
import { type InputProps, inputDefaults } from '../Input';
import type { SelectListItem } from '../SelectList';
import type { BadgeVariant } from '../Badge';
import type { ThemeVariant } from '$lib/types';

export type SelectListButtonVariant = Exclude<ThemeVariant, 'text'>;

export type SelectListButtonProps = InputProps & {
	caret?: string | IconifyIcon;
	filterable?: boolean;
	newable?: boolean;
	placeholder?: string;
	removable?: boolean;
	roticon?: boolean;
	tags?: boolean;
	variant?: SelectListButtonVariant;
	badgeVariant?: BadgeVariant;
	onBeforeAdd?: <T extends SelectListItem>(
		value: string,
		input: HTMLInputElement
	) => T | null | false | undefined | Promise<T | null | false | undefined>;
	onBeforeRemove?: <T extends SelectListItem>(
		item: T,
		input: HTMLInputElement
	) => boolean | Promise<boolean>;
};

export const selectListButtonDefaults: Partial<SelectListButtonProps> = {
	...inputDefaults,
	caret: 'octicon:chevron-down-24', // 'mdi:chevron-down', //  mdi:unfold-more-horizontal,
	placeholder: '',
	roticon: true,
	variant: 'outlined',
	badgeVariant: 'filled',
	onBeforeAdd: (value: string, _input: HTMLInputElement) =>
		({ label: value, value, group: '', selected: false } as any),
	onBeforeRemove: (_item: SelectListItem, _input: HTMLInputElement) => true // default just allow removal.
};
