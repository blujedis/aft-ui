import type { DisclosureStore } from '../../stores';
import { buttonDefaults, type ButtonProps } from '../Button';
import type { ElementNativeProps } from '../../types/components';
import type {
	ThemeColor,
	ThemeRounded,
	ThemeShadowed,
	ThemeSize,
	ThemeTransitioned
} from '$lib/types';

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

export type DropdownGlobals = {
	disabled: boolean;
	full: boolean;
	multiple: boolean;
	placeholder: string | null;
	rounded: ThemeRounded;
	shadowed: ThemeShadowed;
	size: ThemeSize;
	theme: ThemeColor;
	variant: 'outlined'; // to override set on underlying control.
};

export type DropdownContext = DisclosureStore<{
	selected: DropdownKey[];
	items: Required<DropdownItem>[];
	filtered: Required<DropdownItem>[];
	input?: HTMLInputElement;
	button?: HTMLButtonElement;
	panel?: HTMLDivElement;
}> & {
	globals: DropdownGlobals;
	strategy: DropdownStrategy;
	isSelected: (key?: DropdownKey) => boolean;
	trigger: DropdownTrigger;
	add: (item: DropdownItem) => void;
	remove: (value: DropdownKey, filter?: (item: DropdownItem) => boolean) => void;
	select: (key?: DropdownKey) => void;
	unselect: (key?: DropdownKey) => void;
	filter: (query?: string) => void;
	reset: () => void;
};

export type DropdownProps<Tag extends 'button' | 'a'> = Omit<
	ButtonProps<Tag>,
	'strategy' | 'variant'
> & {
	autoclose?: boolean; // when blur close panel if open.
	escapable?: boolean; // close panel when escape is entered.
	filterable?: boolean; // list can be filtered requires below filter.
	filter?: (query: string, items: Required<DropdownItem>[]) => Required<DropdownItem>[];
	items?: DropdownItem[];
	strategy?: DropdownStrategy;
	multiple?: boolean;
	selected?: DropdownKey | DropdownKey[];
	trigger?: DropdownTrigger;
	visible?: boolean;
	selectProps?: ElementNativeProps<'select'>;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { strategy, ...rest } = buttonDefaults;

export const dropdownDefaults: Partial<DropdownProps<'button'>> = {
	...rest,
	as: 'button',
	autoclose: true,
	escapable: true,
	filter: (q, i) =>
		i.filter((v) => v.label.includes(q) || (v.value + '').includes(q) || v.group?.includes(q)),
	items: [],
	strategy: 'menu',
	trigger: 'click'
};
