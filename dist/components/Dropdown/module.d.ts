import type { DisclosureStore } from '../../stores';
import { type ButtonProps } from '../Button';
import type { ElementNativeProps } from '../../types/components';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
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
    variant: 'outlined';
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
export type DropdownProps<Tag extends 'button' | 'a'> = Omit<ButtonProps<Tag>, 'strategy' | 'variant'> & {
    autoclose?: boolean;
    escapable?: boolean;
    filterable?: boolean;
    filter?: (query: string, items: Required<DropdownItem>[]) => Required<DropdownItem>[];
    items?: DropdownItem[];
    strategy?: DropdownStrategy;
    multiple?: boolean;
    selected?: DropdownKey | DropdownKey[];
    trigger?: DropdownTrigger;
    visible?: boolean;
    selectProps?: ElementNativeProps<'select'>;
};
export declare const dropdownDefaults: Partial<DropdownProps<'button'>>;
