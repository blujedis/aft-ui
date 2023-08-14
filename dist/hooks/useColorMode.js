import { writable, get as getStore } from 'svelte/store';
import { browser } from '$app/environment';
let _instance = null;
export function useColorMode(key = 'dark') {
    if (_instance)
        return _instance;
    const store = writable(getMountedValue());
    const methods = {
        getRoot,
        getLocalValue,
        setLocalValue,
        enable,
        toggle,
        reset
    };
    function getMountedValue() {
        if (!browser)
            return false;
        return JSON.parse(localStorage.getItem(key) || 'false');
    }
    function getRoot() {
        if (typeof document === 'undefined')
            return null;
        return document.documentElement;
    }
    function getLocalValue() {
        if (typeof localStorage === 'undefined' || !key)
            return false;
        return JSON.parse(localStorage.getItem(key) || '');
    }
    function setLocalValue(value) {
        if (typeof localStorage === 'undefined')
            return;
        if (value)
            localStorage.setItem(key, JSON.stringify(value));
    }
    function enable(mode) {
        store.update((_s) => (mode === 'light' ? false : true));
    }
    function toggle() {
        const root = getRoot();
        if (!root)
            return;
        const isDark = getStore(store);
        if (!isDark) {
            root.classList.add('dark');
            setLocalValue(true);
        }
        else {
            root.classList.remove('dark');
            setLocalValue(false);
        }
        store.update((_s) => !isDark);
    }
    function reset() {
        localStorage.removeItem(key);
        store.update((_s) => false);
    }
    const api = {
        ...methods,
        ...store
    };
    if (!_instance)
        _instance = api;
    return _instance;
}
