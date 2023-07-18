import { ensureArray } from '$lib/utils';
import { writable, get, type Writable } from 'svelte/store';

export type SelectValue = string | number;

export interface SelectProps {
	max?: number;
	min?: number;
	multiple?: boolean;
	selected: SelectValue[];
}

export type SelectInitProps = SelectProps & { selected?: SelectValue | SelectValue[] };

export interface SelectMethods {
	// reset(...selected: SelectValue[]): void;
	select(value?: SelectValue): void;
	unselect(value?: SelectValue): void;
	toggle(value?: SelectValue): void;
	isSelected(value?: SelectValue): boolean;
}

export type SelectStore<P extends Record<string, any> = Record<string, any>> = Writable<
	SelectProps & P
> &
	SelectMethods;

export function useSelect<P extends Record<string, any> = Record<string, any>>(
	props = {} as P & SelectInitProps
): SelectStore<P> {
	props.selected = ensureArray(props.selected).filter((v) => typeof v !== 'undefined');
	const initialSelected = [...props.selected];
	const store = writable({ multiple: false, ...props } as Required<P & SelectProps>);

	function getStore() {
		return get(store);
	}

	function select(value?: SelectValue) {
		if (typeof value === 'undefined') return;
		store.update((s) => {
			let selected = [] as SelectValue[];
			const multiple = s.multiple;
			if (multiple) selected = s.selected.includes(value) ? s.selected : [...s.selected, value];
			else selected = [value];
			return { ...s, selected };
		});
	}

	function unselect(value?: SelectValue) {
		if (typeof value === 'undefined') return;
		store.update((s) => {
			return { ...s, selected: s.selected.filter((v: SelectValue) => v !== value) };
		});
	}

	function swap(value?: SelectValue) {
		if (typeof value === 'undefined') return;
		store.update((s) => {
			let selected = [...s.selected];
			if (selected.includes(value)) selected = selected.filter((v) => v !== value);
			else if (s.multiple || !selected.length) selected = [...selected, value];
			else if (!s.multiple) selected = [value];
			return { ...s, selected };
		});
	}

	// function reset(...selected: SelectValue[]) {
	// 	store.update((s) => {
	// 		return { ...s, selected: selected.length ? [...selected] : [...initialSelected] };
	// 	});
	// }

	function isSelected(value?: SelectValue): boolean {
		if (typeof value === 'undefined') return false;
		return getStore().selected.includes(value);
	}

	return {
		...store,
		// reset,
		select,
		unselect,
		toggle: swap,
		isSelected
	};
}
