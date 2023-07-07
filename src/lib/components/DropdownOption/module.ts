import type { ThemeColor, ThemeFocused, ThemeSize } from '$lib/theme';
import type { DropdownKey } from '../Dropdown/module';
import type { dropdownOption } from './config';

export type DropdownOptionVariant = keyof typeof dropdownOption;

export type DropdownOptionProps<Tag extends 'a' | 'button'> = {
	element?: Tag;
	focused?: ThemeFocused;
	label?: string;
	size?: ThemeSize;
	theme?: ThemeColor;
	value?: DropdownKey;
	variant?: DropdownOptionVariant;
};

export const dropdownOptionDefaults: Partial<DropdownOptionProps<'button'>> = {
	element: 'button',
	focused: true,
	size: 'sm',
	theme: 'default',
	variant: 'default'
};
