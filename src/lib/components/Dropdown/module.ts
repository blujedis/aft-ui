import type { DisclosureStore } from '../../stores';
import { buttonDefaults, type ButtonProps } from '../Button';
import type { ElementNativeProps } from '../../types/components';

// menu - typical dropdown menu.
// select - single selection trigger button reflects selected value.
// multiselect - shows multiple selected values.
// tags - shows multiple selected as tags.
// combobox - filters items/autocomplete, displays single selected value.

export type DropdownTrigger = 'hover' | 'click' | 'none';
export type DropdownStrategy = 'menu' | 'select' | 'multiselect' | 'combobox' | 'tags';
export type DropdownKey = string | number;
export type DropdownItem = {
	value: string | number;
	label?: any;
	group?: string;
	selected?: boolean;
};

export type DropdownContext = DisclosureStore<{
	selected: DropdownKey[];
	items: Required<DropdownItem>[];
	filtered: Required<DropdownItem>[];
}> & {
	globals: ButtonProps<'button' | 'a'> & { multiple?: boolean };
	strategy: DropdownStrategy;
	isSelected: (key?: DropdownKey) => boolean;
	trigger: DropdownTrigger;
	add: (item: DropdownItem) => void;
	remove: (value: DropdownKey, filter?: (item: DropdownItem) => boolean) => void;
	select: (key?: DropdownKey) => void;
	unselect: (key?: DropdownKey) => void;
	filter: (query?: string) => void;
};

export type DropdownProps<Tag extends 'button' | 'a'> = Omit<ButtonProps<Tag>, 'mode'> & {
	autoclose?: boolean; // when blur close panel if open.
	escapable?: boolean; // close panel when escape is entered.
	filter?: (query: string, items: Required<DropdownItem>[]) => Required<DropdownItem>[];
	focustrap?: boolean; // when true focus is trapped in the dropdown.
	// formatter?: DropdownLabelFormatHandler;
	items?: DropdownItem[];
	strategy?: DropdownStrategy;
	multiple?: boolean;
	selected?: DropdownKey | DropdownKey[];
	trigger?: DropdownTrigger;
	visible?: boolean;
	selectProps?: ElementNativeProps<'select'>;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { mode, ...rest } = buttonDefaults;

export const dropdownDefaults: Partial<DropdownProps<'button'>> = {
	...rest,
	as: 'button',
	autoclose: true,
	escapable: true,
	filter: (q, i) =>
		i.filter(v => v.label.includes(q) || (v.value + '').includes(q) || v.group?.includes(q)),
	focustrap: true,
	items: [],
	trigger: 'click'
};
