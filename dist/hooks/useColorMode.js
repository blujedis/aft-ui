import { writable } from 'svelte/store';
import { browser } from '$app/environment';
export function useColorMode(key = 'dark') {
    const store = writable(browser && JSON.parse(localStorage.getItem(key) || 'false'));
    let dark = false;
    const methods = {
        dark,
        getRoot,
        getLocalValue,
        setLocalValue,
        enable,
        toggle,
        reset
    };
    function getRoot() {
        if (typeof document === 'undefined')
            return null;
        return document.documentElement;
    }
    function getLocalValue(key) {
        if (typeof localStorage === 'undefined' || !key)
            return false;
        return JSON.parse(localStorage.getItem(key) || '');
    }
    function setLocalValue(key, value) {
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
        if (!dark) {
            root.classList.add('dark');
            setLocalValue(key, true);
        }
        else {
            root.classList.remove('dark');
            setLocalValue(key, false);
        }
        store.update((_s) => !dark);
    }
    function reset() {
        localStorage.removeItem(key);
        store.update((_s) => false);
    }
    store.subscribe((s) => (dark = s));
    const api = {
        ...methods,
        ...store
    };
    return api;
}
