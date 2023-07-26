import { type Writable } from 'svelte/store';
export type SelectStoreValue = string | number;
export interface SelectStoreOptions {
    max?: number;
    min?: number;
    multiple?: boolean;
    selected: SelectStoreValue[];
}
export type SelectInitProps = SelectStoreOptions & {
    selected?: SelectStoreValue | SelectStoreValue[];
};
export interface SelectStoreMethods {
    select(value?: SelectStoreValue): void;
    unselect(value?: SelectStoreValue): void;
    toggle(value?: SelectStoreValue): void;
    isSelected(value?: SelectStoreValue): boolean;
}
export type SelectStore<P extends Record<string, any> = Record<string, any>> = Writable<SelectStoreOptions & P> & SelectStoreMethods;
export declare function useSelect<P extends Record<string, any> = Record<string, any>>(props?: P & SelectStoreOptions & {
    selected?: SelectStoreValue | SelectStoreValue[] | undefined;
}): SelectStore<P>;
