/// <reference types="svelte" />
import { type Writable } from 'svelte/store';
export type SelectStoreValue = any;
export interface SelectStoreOptions {
    max?: number;
    min?: number;
    selected: any;
    mode: 'single' | 'multiple' | 'single-array';
    onChange?: (selected: any) => any;
}
export interface SelectStoreMethods {
    reset(value?: SelectStoreValue): void;
    select(value?: SelectStoreValue): void;
    unselect(value?: SelectStoreValue): void;
    toggle(value?: SelectStoreValue): void;
}
export type SelectStore<P extends Record<string, any> = Record<string, any>> = Writable<SelectStoreOptions & P> & SelectStoreMethods;
export declare function useSelect<P extends Record<string, any> = Record<string, any>>(options?: P & SelectStoreOptions): SelectStore<P>;
