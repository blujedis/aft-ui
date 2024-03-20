/// <reference types="svelte" />
import { type Writable } from 'svelte/store';
export type SelectStoreValue = string | number | Date | boolean | bigint | null | undefined | HTMLElement;
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
    restore(...selected: SelectStoreValue[]): void;
    select(value?: SelectStoreValue): void;
    unselect(value?: SelectStoreValue): void;
    toggle(value?: SelectStoreValue): void;
    isSelected(value?: SelectStoreValue): boolean;
}
export type SelectStore<P extends Record<string, any> = Record<string, any>> = Writable<SelectStoreOptions & P> & SelectStoreMethods;
export declare function useSelect<P extends Record<string, any> = Record<string, any>>(props?: P & SelectStoreOptions & {
    selected?: SelectStoreValue | SelectStoreValue[];
}): SelectStore<P>;
