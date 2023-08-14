import { writable, type Writable, get as storeGet } from 'svelte/store';
import type { DeepPartial, ThemeConfig, ThemeDefaults } from '../types/theme';
import defaultDefaults from './defaults';
import * as defaultOptions from '../components/options';
import * as defaultComponents from '../components/configs';
import { cleanObj } from '../utils';
// import defaultTheme from './theme.json';

export type ThemeStore<T> = Omit<Writable<T>, 'update'> & {
	get(): T;
	update(theme: DeepPartial<T>): void;
};

let _themeStore: ThemeStore<any>;

const defaultTheme = {
	options: defaultOptions,
	defaults: defaultDefaults,
	components: defaultComponents
	//	palette
};

/**
 * Internal store creator.
 *
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
function createStoreInternal<T extends ThemeConfig>(
	{ options, defaults, components, ...rest }: DeepPartial<T>,
	baseTheme = { ...defaultTheme }
): ThemeStore<T> {

	if (_themeStore)
		return _themeStore as ThemeStore<T>;

	const normalized = {
		components: {
			...baseTheme.components,
			...components
		},
		options: {
			...baseTheme.options,
			...options
		},
		defaults: {
			...baseTheme.defaults,
			...defaults
		},
		// ...ensureDefaults(baseTheme, { options, defaults, components }),
		...rest
	} as unknown as T;

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
		update
	};

	if (!_themeStore)
		_themeStore = themeStoreInternal;

	return _themeStore as ThemeStore<T>;
}

export const themeStore = createStoreInternal(defaultTheme);

/**
 * Creates a new store which updates the default store's components and options when changed.
 *
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export function createStore<T extends Record<string, unknown> & DeepPartial<ThemeConfig>>(
	extendTheme: T,
	baseTheme = { ...defaultTheme }
) {
	const store = createStoreInternal(extendTheme, baseTheme);
	_themeStore.subscribe((s) => {
		// update default store on change.
		_themeStore.update({ options: s.options, defaults: s.defaults, components: s.components });
	});
	return store as ThemeStore<T & ThemeConfig>;
}
