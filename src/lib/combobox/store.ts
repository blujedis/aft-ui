import { get, writable, type Writable } from 'svelte/store';

export interface ListStore<T extends string | Record<string, any>> {
	/**
	 * Item collection store.
	 */
	items: Writable<T[]>;

	/**
	 * Selected item store.
	 */
	selected: Writable<T | null>;

	/**
	 * Replaces the store with the new collection.
	 *
	 * @param collection the collection to set as store value.
	 * @param clearSelected when true also clear selected value.
	 */
	replace(collection: T[], clearSelected?: boolean): void;

	/**
	 * Adds items to the store collection.
	 *
	 * @param item the item to be added.
	 * @param items additional items to add if any.
	 */
	add(item: T, ...items: T[]): void;

	/**
	 * Filters source and applies to filtered store.
	 *
	 * @param predicate the predicate for filtering.
	 * @param cb optional callback for receiving the results.
	 */
	filter(predicate: (item: T) => boolean, cb?: (collection: T[]) => void): Promise<T[]>;

	/**
	 * Clears the current filter.
	 */
	unfilter(): void;

	/**
	 * Sets selected store's selected value.
	 *
	 * @param value the value to set as selected.
	 */
	select(value: T | null): void;

	/**
	 * Removes selected value setting to null.
	 */
	unselect(): void;

	/**
	 * Resets both the items store and the selected store initialized values.
	 */
	reset(): void;
}

/**
 * Creates a new store collection.
 *
 * @param collection the collection to create store for.
 * @param selected the initially selected value.
 */
export function createList<T extends string | Record<string, any>>(
	initCollection = [] as T[],
	selected = null as T | null
): ListStore<T> {
	const _itemsSource = structuredClone(initCollection);
	const _selectedSource = structuredClone(selected);

	const itemsStore = writable(initCollection);
	const selectedStore = writable(selected as T | null);

	const api = {
		items: itemsStore,
		selected: selectedStore,
		replace,
		add,
		filter,
		unfilter,
		select,
		unselect,
		reset
	};

	/**
	 * Replaces the store with the new collection.
	 *
	 * @param collection the collection to set as store value.
	 * @param clearSelected when true also clear selected value.
	 */
	function replace(collection: T[], clearSelected = false) {
		itemsStore.set(collection);
		if (clearSelected) selectedStore.set(null);
	}

	/**
	 * Adds items to the store collection.
	 *
	 * @param item the item to be added.
	 * @param items additional items to add if any.
	 */
	function add(item: T, ...items: T[]) {
		items.unshift(item);
		itemsStore.update((storeItems) => [...storeItems, ...items]);
	}

	/**
	 * Filters source and applies to filtered store.
	 *
	 * @param predicate the predicate for filtering.ƒ
	 * @param cb optional callback for receiving the results.
	 */
	function filter(predicate: (item: T) => boolean, cb?: (collection: T[]) => void) {
		return new Promise<T[]>((resolve) => {
			itemsStore.update((storeItems) => {
				const result = storeItems.filter(predicate);
				if (cb) cb(result);
				resolve(result);
				return result;
			});
		});
	}

	/**
	 * Clears the current filter.
	 */
	function unfilter() {
		itemsStore.set(_itemsSource);
	}

	/**
	 * Sets selected store's selected value.
	 *
	 * @param value the value to set as selected.
	 */
	function select(value: T | null) {
		selectedStore.set(value);
	}

	/**
	 * Removes selected value setting to null.
	 */
	function unselect() {
		select(null);
	}

	/**
	 * Resets both the items store and the selected store initialized values.
	 */
	function reset() {
		itemsStore.set(_itemsSource);
		selectedStore.set(_selectedSource);
	}

	return api;
}
