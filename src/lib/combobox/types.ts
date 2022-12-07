import type { BaseSize, Shadow } from '$lib/types';
import type { Palette, TypeOrValue } from '@forewind/util';
import type { ListStore } from '../app/hooks/useListController';

export type ComboboxItem<S extends string | Record<string, any> = string | Record<string, any>> = Record<string, any> & { key: string; value: any, source: S };

export type ListItem = string | Record<string, any>;

export interface ComboboxContext<T extends ComboboxItem> {
	base?: boolean;
	theme?: TypeOrValue<keyof Palette>;
	size?: TypeOrValue<BaseSize>;
	shadow?: TypeOrValue<Shadow>;
	transform?: any;
	weight?: any;
	icons?: boolean;
	addOptions?: boolean;
	controller: ListStore<T>;
	addItem: (value: T) => void;
	onMatch: (value: T | null, row: T) => boolean;
	handleSelect(key?: string | null, close?: boolean): void;
}
