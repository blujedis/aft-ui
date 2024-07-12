import { writable, get as storeGet } from 'svelte/store';
import { cleanObj, simpleClone } from '../utils';
import defaults from 'defaults';
let _themeStore;
/**
 * Internal store creator.
 *
 * @param userTheme the user defined theme.
 * @param defaultTheme the base them so we can ensure all properties.
 */
export function createStoreInternal(userTheme, defaultTheme = {}) {
    if (_themeStore)
        return _themeStore;
    // Create simple clone to ensure not modules
    // props exist otherwise structuredClone will fail internally.
    const userClone = simpleClone(userTheme);
    const normalized = defaults(userClone, defaultTheme);
    normalized.defaults.component = cleanObj(normalized.defaults.component);
    const store = writable(normalized);
    /**
     * Sets the theme configuration.
     *
     * NOTE: similar to interal store.set() but ensures defaults and validates types.
     *
     * @param updateTheme the them configuration to update to.
     */
    function update(updateTheme) {
        store.update((s) => {
            return defaults(simpleClone(updateTheme), s);
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
 * @param extendTheme extend the defined theme.
 * @param defaultTheme the base them so we can ensure all properties.
 */
export function createStore(extendTheme, defaultTheme = { ..._themeStore.defaultTheme }) {
    const store = createStoreInternal(extendTheme, defaultTheme);
    _themeStore.subscribe(({ options, defaults, components }) => {
        // update internal store on change.
        _themeStore.update({ options, defaults, components });
    });
    return store;
}
