import type { SelectStore, SelectStoreValue } from '../../stores';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { selectList } from './config';
import type { SelectListButtonVariant, SelectListButtonProps } from '../SelectListButton';
export type SelectListVariant = keyof typeof selectList;
export type SelectListItemKey = SelectStoreValue;
export type SelectListItem = {
    label?: string;
    value: SelectListItemKey;
    group?: string | number;
    selected?: boolean;
};
export type SelectListStore<T extends SelectListItem = SelectListItem> = {
    visible?: boolean;
    items: T[];
    filtered: T[];
    input?: HTMLInputElement;
    panel?: HTMLDivElement;
};
export type SelectListContext<T extends SelectListItem = SelectListItem> = SelectStore<SelectListStore> & {
    open(): void;
    close(): void;
    toggle(): void;
    isSelected(key: SelectListItemKey): boolean;
    isSelected(item: T): boolean;
    add({ value, label, group, selected }: T): void;
    remove(key: SelectListItemKey): void;
    remove(item: T): void;
    filter(query?: string): void;
    reset(selectedItems?: SelectListItemKey[]): void;
    globals: SelectListGlobalProps;
};
export type SelectListGlobalProps = {
    full?: boolean;
    newable?: boolean;
    placeholder?: string;
    removable?: boolean;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    strategy?: 'button' | 'text';
    tags?: boolean;
    theme?: ThemeColor;
    underlined?: boolean;
    variant?: SelectListButtonVariant;
    onBeforeAdd?: SelectListButtonProps['onBeforeAdd'];
    onBeforeRemove?: SelectListButtonProps['onBeforeRemove'];
};
export type SelectListProps<T extends SelectListItem> = SelectListGlobalProps & {
    autoclose?: boolean;
    escapable?: boolean;
    items: T[];
    store?: SelectStore<SelectListStore>;
    visible?: boolean;
    filter?: (query: string, items: Required<T>[]) => Required<T>[];
};
export declare const selectListDefaults: Partial<SelectListProps<SelectListItem> & SelectListGlobalProps>;
