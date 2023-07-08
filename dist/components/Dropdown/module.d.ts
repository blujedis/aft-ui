import type { DisclosureStore } from '../../stores';
import { type ButtonProps } from '../Button';
import type { ElementNativeProps } from '../types';
export type DropdownTrigger = 'hover' | 'click' | 'none';
export type DropdownMode = 'menu' | 'select' | 'multiselect' | 'combobox';
export type DropdownKey = string | number;
export type DropdownItem = {
	value: string | number;
	label?: any;
	group?: string;
	selected?: boolean;
};
export type DropdownLabelFormatHandler = (
	value: DropdownKey,
	label?: string,
	group?: string
) => string;
export type DropdownContext = DisclosureStore<{
	selected: DropdownKey[];
	items: Required<DropdownItem>[];
	filtered: Required<DropdownItem>[];
}> & {
	add: (value: DropdownKey, label?: string, group?: string) => void;
	remove: (value: DropdownKey, filter?: (item: DropdownItem) => boolean) => void;
	mode: DropdownMode;
	isSelected: (key?: DropdownKey) => boolean;
	select: (key?: DropdownKey) => void;
	trigger: DropdownTrigger;
	unselect: (key?: DropdownKey) => void;
	globals: ButtonProps<'button' | 'a'> & {
		multiple?: boolean;
	};
};
export type DropdownProps<Tag extends 'button' | 'a'> = ButtonProps<Tag> & {
	autoclose?: boolean;
	escapable?: boolean;
	focustrap?: boolean;
	formatter?: DropdownLabelFormatHandler;
	items?: DropdownItem[];
	mode?: DropdownMode;
	multiple?: boolean;
	selected?: DropdownKey | DropdownKey[];
	trigger?: DropdownTrigger;
	visible?: boolean;
	selectProps?: ElementNativeProps<'select'>;
};
export declare const dropdownDefaults: Partial<DropdownProps<'button'>>;
