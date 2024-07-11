import { writable, type Writable, get as storeGet } from 'svelte/store';
import type { DeepPartial, ThemeConfig, ThemeDefaults } from '../types/theme';
import { cleanObj, simpleClone } from '../utils';
import defaults from 'defaults';

export type ThemeStore<T> = Omit<Writable<T>, 'update'> & {
	get(): T;
	update(theme: DeepPartial<T>): void;
	defaultTheme: T;
};

let _themeStore: ThemeStore<any>;

/**
 * Internal store creator.
 *
 * @param userTheme the user defined theme.
 * @param defaultTheme the base them so we can ensure all properties.
 */
export function createStoreInternal<T extends ThemeConfig>(
	userTheme: DeepPartial<T>,
	defaultTheme = {} as T
): ThemeStore<T> {
	if (_themeStore) return _themeStore as ThemeStore<T>;

	// Create simple clone to ensure not modules
	// props exist otherwise structuredClone will fail internally.
	const userClone = simpleClone(userTheme);
	const normalized = defaults(userClone, defaultTheme as DeepPartial<T>) as Required<T>;

	normalized.defaults.component = cleanObj(normalized.defaults.component) as Required<
		ThemeDefaults['component']
	>;

	const store = writable(normalized);

	/**
	 * Sets the theme configuration.
	 *
	 * NOTE: similar to interal store.set() but ensures defaults and validates types.
	 *
	 * @param updateTheme the them configuration to update to.
	 */
	function update(updateTheme: DeepPartial<T>) {
		store.update((s) => {
			return defaults(simpleClone(updateTheme), s) as Required<T>;
		});
	}

	function get() {
		return storeGet(store);
	}

	const themeStoreInternal = {
		...store,
		get,
		update,
		defaultTheme
	};

	if (!_themeStore) _themeStore = themeStoreInternal;

	return _themeStore as ThemeStore<T>;
}

/**
 * Creates a new store which updates the default store's components and options when changed.
 *
 * @param extendTheme extend the defined theme.
 * @param defaultTheme the base them so we can ensure all properties.
 */
export function createStore<T extends Record<string, unknown> & DeepPartial<ThemeConfig>>(
	extendTheme: T,
	defaultTheme = { ..._themeStore.defaultTheme }
) {
	const store = createStoreInternal(extendTheme, defaultTheme);
	_themeStore.subscribe(({ options, defaults, components }) => {
		// update internal store on change.
		_themeStore.update({ options, defaults, components });
	});
	return store as ThemeStore<T & ThemeConfig>;
}
