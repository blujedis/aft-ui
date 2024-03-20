import { ensureArray } from '$lib/utils';
import { writable, type Writable } from 'svelte/store';

export type SelectStoreValue =
	| string
	| number
	| Date
	| boolean
	| bigint
	| null
	| undefined
	| HTMLElement;

export interface SelectStoreOptions {
	max?: number;
	min?: number;
	multiple?: boolean;
	selected: SelectStoreValue[];
	onChange?: (selected: SelectStoreValue[]) => any;
}

export type SelectInitProps = SelectStoreOptions & {
	selected?: SelectStoreValue | SelectStoreValue[];
};

export interface SelectStoreMethods {
	restore(...selected: SelectStoreValue[]): void;
	select(value?: SelectStoreValue): void;
	unselect(value?: SelectStoreValue): void;
	toggle(value?: SelectStoreValue): void;
}

export type SelectStore<P extends Record<string, any> = Record<string, any>> = Writable<
	SelectStoreOptions & P
> &
	SelectStoreMethods;

export function useSelect<P extends Record<string, any> = Record<string, any>>(
	props = {} as P & SelectInitProps
): SelectStore<P> {
	const initialSelected = ensureArray(props.selected).filter((v) => typeof v !== 'undefined');
	const store = writable({ multiple: false, ...props, selected: [...initialSelected] } as Required<
		P & SelectStoreOptions
	>);

	function select(value?: SelectStoreValue) {
		if (typeof value === 'undefined') return;
		store.update((s) => {
			let selected = [] as SelectStoreValue[];
			const multiple = s.multiple;
			if (multiple) selected = s.selected.includes(value) ? s.selected : [...s.selected, value];
			else selected = [value];
			if (typeof props.onChange === 'function')
				props.onChange(selected);
			return { ...s, selected: [...selected] };
		});
	}

	function unselect(value?: SelectStoreValue) {
		if (typeof value === 'undefined') return;
		store.update((s) => {
			const selected = s.selected.filter((v: SelectStoreValue) => v !== value);
			if (typeof props.onChange === 'function')
				props.onChange(selected);
			return { ...s, selected };
		});
	}

	function toggle(value?: SelectStoreValue) {
		if (typeof value === 'undefined') return;
		store.update((s) => {
			let selected = [...s.selected];
			if (selected.includes(value)) selected = selected.filter((v) => v !== value);
			else if (s.multiple || !selected.length) selected = [...selected, value];
			else if (!s.multiple) selected = [value];
			if (typeof props.onChange === 'function')
				props.onChange(selected);
			return { ...s, selected };
		});
	}

	function restore(...selected: SelectStoreValue[]) {
		store.update((s) => {
			const _selected = selected.length ? [...selected] : [...initialSelected];
			if (typeof props.onChange === 'function')
				props.onChange(_selected);
			return { ...s, selected: _selected };
		});
	}

	return {
		...store,
		restore,
		select,
		unselect,
		toggle,
	};
}
