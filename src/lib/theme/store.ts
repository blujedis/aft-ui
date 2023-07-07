import { writable, type Writable, get as storeGet } from 'svelte/store';
import type { DeepPartial, ThemeConfig } from './types';
import defaults from './defaults';
import * as options from './options';
import * as components from '../components/configs';
import * as componentOptions from '../components/options';
import { appcolors } from './palettes';

export type ThemeStore<T> = Omit<Writable<T>, 'update'> & {
	get(): T;
	update(theme: DeepPartial<T>): void;
};

const defaultTheme = {
	options: { ...options, ...componentOptions },
	defaults,
	components,
	palette: appcolors
};

/**
 * Replaces target values with overrides, ensures all target values exist.
 *
 * @param target the target to merge overrides into.
 * @param overrides the values used to override target values.
 */
function ensureDefaults(target: Record<string, any>, overrides: Record<string, any>) {
	let k: keyof typeof target | keyof typeof overrides;
	const cloneTarget = { ...target };
	for (k in cloneTarget) {
		const t = cloneTarget[k];
		const s = overrides[k];
		if (typeof t === 'object' && typeof s === 'object') ensureDefaults(t, s);
		else if (typeof t === 'string' && typeof s === 'string') cloneTarget[k] = s;
	}
	return cloneTarget;
}

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
	const normalized = {
		...ensureDefaults(baseTheme, { options, defaults, components }),
		...rest
	} as unknown as T;

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
			return ensureDefaults(s, theme) as unknown as T;
		});
	}

	function get() {
		return storeGet(store);
	}

	return {
		...store,
		get,
		update
	};
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
	store.subscribe((s) => {
		// update default store on change.
		themeStore.update({ options: s.options, defaults: s.defaults, components: s.components });
	});
	return store as ThemeStore<T & ThemeConfig>;
}
