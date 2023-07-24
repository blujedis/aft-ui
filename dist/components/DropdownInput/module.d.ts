import type { IconifyIcon } from '@iconify/svelte';
import type { InputProps } from '../Input';
import type { DropdownItem } from '../Dropdown/module';
export interface DropdownFilterHandler {
    (item: Required<DropdownItem>): boolean;
    (items: Required<DropdownItem>[]): Required<DropdownItem>[];
}
export type DropdownInputProps = InputProps & {
    caret?: null | string | IconifyIcon;
    filterable?: boolean;
    multiple?: boolean;
    newable?: boolean;
    removable?: boolean;
    resetable?: boolean;
    placeholder?: string;
    roticon?: string | boolean;
    stacked?: boolean;
};
export declare const dropdownInputDefaults: DropdownInputProps;
