import type { IconifyIcon } from '@iconify/svelte';
import { type InputProps, inputDefaults } from '../Input';
import type { SelectListItem } from '../SelectList';
import type { BadgeProps, BadgeVariant } from '../Badge';

export type SelectListVariant = 'filled' | 'outlined' | 'soft' | 'flushed' | 'text';

export type SelectListButtonProps = InputProps & {
	badgeProps?: BadgeProps;
	caret?: string | IconifyIcon;
	filterable?: boolean;
	hovered?: boolean;
	multiple?: boolean;
	newable?: boolean;
	placeholder?: string;
	removable?: boolean;
	roticon?: boolean;
	variant?: SelectListVariant;
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
	roticon: true,
	placeholder: 'Please Select',
	onBeforeAdd: (value: string, _input: HTMLInputElement) =>
		({ label: value, value, group: '', selected: false }) as any,
	onBeforeRemove: (_item: SelectListItem, _input: HTMLInputElement) => true // default just allow removal.
};
