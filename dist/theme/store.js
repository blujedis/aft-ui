import { writable, get as storeGet } from 'svelte/store';
import defaults from './defaults';
import * as options from './options';
import * as components from '../components/configs';
import * as componentOptions from '../components/options';
import { palette } from './palettes';
const defaultTheme = {
	options: { ...options, ...componentOptions },
	defaults,
	components,
	palette
};
/**
 * Replaces target values with overrides, ensures all target values exist.
 *
 * @param target the target to merge overrides into.
 * @param overrides the values used to override target values.
 */
function ensureDefaults(target, overrides) {
	let k;
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
function createStoreInternal(
	{ options, defaults, components, ...rest },
	baseTheme = { ...defaultTheme }
) {
	const normalized = {
		...ensureDefaults(baseTheme, { options, defaults, components }),
		...rest
	};
	const store = writable(normalized);
	/**
	 * Sets the theme configuration.
	 *
	 * NOTE: similar to interal store.set() but ensures defaults and validates types.
	 *
	 * @param theme the them configuration to update to.
	 */
	function update(theme) {
		store.update((s) => {
			return ensureDefaults(s, theme);
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
export function createStore(extendTheme, baseTheme = { ...defaultTheme }) {
	const store = createStoreInternal(extendTheme, baseTheme);
	store.subscribe((s) => {
		// update default store on change.
		themeStore.update({ options: s.options, defaults: s.defaults, components: s.components });
	});
	return store;
}
