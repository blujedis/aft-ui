import { writable, type Writable, get as storeGet } from 'svelte/store';
import type { DeepPartial, ThemeConfig, ThemeDefaults } from '../types/theme';
import { cleanObj } from '../utils';
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
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export function createStoreInternal<T extends ThemeConfig>(
	userTheme: DeepPartial<T>, defaultTheme = {} as T): ThemeStore<T> {

	if (_themeStore) return _themeStore as ThemeStore<T>;

	const normalized = defaults(userTheme, defaultTheme as any) as Required<T>;

	normalized.defaults.component = cleanObj(normalized.defaults.component) as Required<
		ThemeDefaults['component']
	>;

	const store = writable(normalized);

	/**
	 * Sets the theme configuration.
	 *
	 * NOTE: similar to interal store.set() but ensures defaults and validates types.
	 *
	 * @param theme the them configuration to update to.
	 */
	function update(theme: DeepPartial<T>) {
		store.update((s) => {
			return s; //  ensureDefaults(s, theme) as unknown as T;
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
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export function createStore<T extends Record<string, unknown> & DeepPartial<ThemeConfig>>(
	extendTheme: T,
	defaultTheme = { ..._themeStore.defaultTheme }
) {
	const store = createStoreInternal(extendTheme, defaultTheme);
	_themeStore.subscribe((s) => {
		// update default store on change.
		_themeStore.update({ options: s.options, defaults: s.defaults, components: s.components });
	});
	return store as ThemeStore<T & ThemeConfig>;
}
