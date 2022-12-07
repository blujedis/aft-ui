import { writable, type Readable, type Unsubscriber, type Writable } from 'svelte/store';
import loashMerge from 'lodash.merge';
import { useStorage } from './useStorage';
import type { DeepPartial } from '@forewind/util';

interface Store<T> {
	subscribe: Readable<T>['subscribe'];
	set: Writable<T>['set'];
}

type MergeValue<T> = T extends StoreType ? never : T extends object ? DeepPartial<T> : never;

type StoreType = string | boolean | number | null | undefined | any[];

interface StoreOptionsBase<T, K extends keyof T = keyof T> {
	persistKey?: string;
	persistProps?: K[];
}

export interface PersistentStore<T> extends Store<T> {
	persist(): PersistentStore<T>;
	merge<U extends MergeValue<T>>(value: U): PersistentStore<U & T>;
	disable: () => void;
}

export type StoreOptions<T extends StoreType | Record<string, any>> = T extends StoreType
	? Omit<StoreOptionsBase<T>, 'peristProps'>
	: T extends object
	? StoreOptionsBase<T>
	: never;

// Picks the keys of an object that should be persisted.
function pickPersist<T extends Record<string, any>, K extends keyof T>(data: T, ...keys: K[]) {
	if (!keys.length) return data;
	return Object.entries(data).reduce((result, [key, val]) => {
		if (keys.includes(key as K)) result[key as K] = val;
		return result;
	}, {} as Record<K, T[K]>);
}

function getPersistData<T extends StoreType | Record<string, any>, K extends keyof T>(
	data: T,
	...keys: K[]
) {
	if (
		data === null ||
		typeof data === 'undefined' ||
		typeof data !== 'object' ||
		Array.isArray(data) ||
		!keys.length
	)
		return data;
	return pickPersist(data, ...keys);
}

/**
 * Creates a new Svelte Store.
 *
 * @param data the initial object value for the store.
 * @param persistKey the optional key for persisting to localStorage.
 * @param persistProps the properties in the object that should persist to localStorage.
 */
export function useStore<T extends StoreType | Record<string, any>>(
	data: T,
	options: StoreOptions<T>
) {
	const { persistKey, persistProps } = options;
	const { subscribe, set, update } = writable(data);
	const storage = useStorage();

	let unsubscriber: Unsubscriber;

	const api = {
		subscribe,
		set,
		update,
		persist,
		merge,
		disable
	} as PersistentStore<T>;

	/**
	 * Enables new store.
	 *
	 * @param value the optional value to extend store with.
	 */
	function persist() {
		if (!persistKey) return api as PersistentStore<T>;
		const storageValue = storage.get<T>(persistKey);
		const mergedValue = loashMerge(data, storageValue);
		set(mergedValue);
		unsubscriber = subscribe((storeValue) => {
			// If persistent data an object and specific keys are
			// provided it will persist only those keys otherwise
			// if not object it will just return orig data and persist it.
			const persistData = getPersistData(storeValue, ...(persistProps as any));
			storage.set(persistKey, persistData);
		});
		return api as PersistentStore<T>;
	}

	/**
	 * Same as calling unsubscriber but also clears storage if
	 * persistent key was use.
	 */
	function disable() {
		if (persistKey) storage.remove(persistKey);
		unsubscriber();
	}

	/**
	 * When store is an object enables merging resulting in exending the source store value.
	 * Supports both object literals and arrays.
	 *
	 * @param value the value to use to merge or overwrite.
	 */
	function merge<U extends MergeValue<T>>(value: U) {
		update((currentValue) => {
			if (typeof currentValue !== 'object' || typeof value !== 'object')
				throw new Error(`Type mismatch, .merge() can only be used with object literal types.`);
			if (Array.isArray(currentValue) && Array.isArray(value)) return [...currentValue, ...value];
			return loashMerge(currentValue, value) as any;
		});
		return api as PersistentStore<U & T>;
	}

	if (persistKey) persist();

	return api;
}
