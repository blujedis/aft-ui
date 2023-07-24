import { type Writable } from 'svelte/store';
export type SelectValue = string | number;
export interface SelectProps {
    max?: number;
    min?: number;
    multiple?: boolean;
    selected: SelectValue[];
}
export type SelectInitProps = SelectProps & {
    selected?: SelectValue | SelectValue[];
};
export interface SelectMethods {
    select(value?: SelectValue): void;
    unselect(value?: SelectValue): void;
    toggle(value?: SelectValue): void;
    isSelected(value?: SelectValue): boolean;
}
export type SelectStore<P extends Record<string, any> = Record<string, any>> = Writable<SelectProps & P> & SelectMethods;
export declare function useSelect<P extends Record<string, any> = Record<string, any>>(props?: P & SelectProps & {
    selected?: SelectValue | SelectValue[] | undefined;
}): SelectStore<P>;
