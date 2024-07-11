import { ensureArray } from '$lib';
import { writable, type Writable } from 'svelte/store';

export type SelectStoreValue = any;

export interface SelectStoreOptions {
	max?: number;
	min?: number;
	selected: any;
	// single - selected has a single value
	// single-array - selected is an array with only one value.
	// multiple - selected is an array iwth multiple values.
	mode: 'single' | 'multiple' | 'single-array';
	onChange?: (selected: any) => any;
}

export interface SelectStoreMethods {
	reset(value?: SelectStoreValue): void;
	select(value?: SelectStoreValue): void;
	unselect(value?: SelectStoreValue): void;
	toggle(value?: SelectStoreValue): void;
}

export type SelectStore<P extends Record<string, any> = Record<string, any>> = Writable<
	SelectStoreOptions & P
> &
	SelectStoreMethods;

export function useSelect<P extends Record<string, any> = Record<string, any>>(
	options = {} as P & SelectStoreOptions
): SelectStore<P> {
	options = {
		min: 0,
		max: 0,
		...options
	};

	const isArray =
		['multiple', 'single-array'].includes('mode') || Array.isArray(options.selected) ? true : false;
	const isSingleArray = options.mode === 'single-array';

	// If multiple selected must be an array.
	options.selected = isArray ? ensureArray(options.selected) : options.selected;

	const initialSelected = options.selected;
	const store = writable(options as Required<P & SelectStoreOptions>);

	// store.subscribe(s => {
	// 	if (typeof options.onChange === 'function')
	// 		options.onChange(s.selected || []);
	// });

	function canRemove(selected: any) {
		if (!isArray || isSingleArray) return true;
		const len = selected.length;
		if (len === 0) return true;
		if (len - 1 >= (options.min || 0)) return true;
		return false;
	}

	function canAdd(selected: any) {
		if (!options.max || !isArray || isSingleArray) return true;
		const len = selected.length;
		if (len + 1 <= options.max) return true;
		return false;
	}

	function canReset(selected: any) {
		if (!isArray || isSingleArray || (!options.max && !options.min)) return true;
		if (options.min && selected.length < options.min) return false;
		if (options.max && selected.length > options.max) return false;
		return true;
	}

	function select(value?: SelectStoreValue) {
		store.update((s) => {
			if (typeof value === 'undefined' || !canRemove(s.selected))
				return { ...s, selected: isArray ? [] : undefined };
			let selected = value;
			if (isArray)
				selected = isSingleArray
					? [value]
					: s.selected.includes(value)
						? s.selected
						: [...s.selected, value];
			if (typeof options.onChange === 'function') options.onChange(selected);
			return { ...s, selected };
		});
	}

	function unselect(value?: SelectStoreValue) {
		store.update((s) => {
			if (!canRemove(s.selected)) return { ...s };
			let selected = value;
			if (isArray) selected = isSingleArray ? [] : s.selected.filter((v: any) => v !== value);
			if (typeof options.onChange === 'function') options.onChange(selected);
			return { ...s, selected };
		});
	}

	function toggle(value?: SelectStoreValue) {
		if (typeof value === 'undefined') return;
		store.update((s) => {
			let selected = s.selected;
			const hasValue = isArray ? selected.includes(value) : value === selected;
			if (isSingleArray) {
				selected = hasValue ? [] : [value];
			} else if (isArray) {
				if (hasValue && canRemove(selected)) selected = selected.filter((v: any) => v !== value);
				else if (canAdd(selected)) selected = [...selected, value];
			} else {
				selected = hasValue ? undefined : value;
			}
			if (typeof options.onChange === 'function') options.onChange(selected);
			return { ...s, selected };
		});
	}

	function reset(selected = initialSelected as SelectStoreValue) {
		if (!canReset(selected)) {
			console.warn(`Reset collection is greater than options.max or less than options.min`);
			return;
		}
		store.update((s) => {
			if (typeof options.onChange === 'function') options.onChange(selected);
			return { ...s, selected };
		});
	}

	return {
		...store,
		reset,
		select,
		unselect,
		toggle
	};
}
