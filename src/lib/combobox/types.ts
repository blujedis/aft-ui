import type { BaseSize, Shadow } from '$lib/types';
import type { Palette, TypeOrValue } from '@forewind/util';
import type { ListStore } from './store';

export interface ComboboxContext<T extends string | Record<string, any>> {
	base?: boolean;
	theme?: TypeOrValue<keyof Palette>;
	size?: TypeOrValue<BaseSize>;
	shadow?: TypeOrValue<Shadow>;
	transform?: any;
	weight?: any;
	icons?: boolean;
	addOptions?: boolean;
	controller: ListStore<T>;
	onMatch: (value: T | null, row: T) => boolean;
	handleSelect(item: T | null, close?: boolean, e?: MouseEvent | TouchEvent): void;
	// itemsStore: Writable<T[]>;
	// selectedStore: Writable<T>;
	// rounded: Rounded;
	// transition: boolean;
	// hovered: boolean;
	// variant: TypeOrValue<keyof typeof combobox.main.variant>;
}
