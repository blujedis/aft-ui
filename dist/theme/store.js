import { writable, get as storeGet } from 'svelte/store';
import { cleanObj } from '../utils';
import defaults from 'defaults';
let _themeStore;
/**
 * Internal store creator.
 *
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export function createStoreInternal(userTheme, defaultTheme = {}) {
    if (_themeStore)
        return _themeStore;
    const normalized = defaults(userTheme, defaultTheme);
    normalized.defaults.component = cleanObj(normalized.defaults.component);
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
    if (!_themeStore)
        _themeStore = themeStoreInternal;
    return _themeStore;
}
/**
 * Creates a new store which updates the default store's components and options when changed.
 *
 * @param initTheme the initial them to be applied.
 * @param baseTheme the base them so we can ensure all properties.
 */
export function createStore(extendTheme, defaultTheme = { ..._themeStore.defaultTheme }) {
    const store = createStoreInternal(extendTheme, defaultTheme);
    _themeStore.subscribe((s) => {
        // update default store on change.
        _themeStore.update({ options: s.options, defaults: s.defaults, components: s.components });
    });
    return store;
}
