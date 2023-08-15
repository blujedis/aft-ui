import { writable, type Writable, get as getStore } from 'svelte/store';
import { browser } from '$app/environment';

export type ColorModeHook = ReturnType<typeof useColorMode>;

export interface UseColorModeOptions {
	key?: string;
}

let _instance: any = null;

export function useColorMode(key = 'dark') {
	type ColorModeInstance = Writable<boolean> & typeof methods;

	if (_instance) return _instance as ColorModeInstance;

	const store = writable<boolean>(getMountedValue());

	const methods = {
		getRoot,
		getLocalValue,
		setLocalValue,
		enable,
		toggle,
		reset
	};

	function getMountedValue() {
		if (!browser) return false;
		return JSON.parse(localStorage.getItem(key) || 'false');
	}

	function getRoot() {
		if (typeof document === 'undefined') return null;
		return document.documentElement;
	}

	function getLocalValue(): boolean {
		if (typeof localStorage === 'undefined' || !key) return false;
		return JSON.parse(localStorage.getItem(key) || '');
	}

	function setLocalValue(value: any) {
		if (typeof localStorage === 'undefined') return;
		if (value) localStorage.setItem(key, JSON.stringify(value));
	}

	function enable(mode: 'light' | 'dark') {
		store.update((_s) => (mode === 'light' ? false : true));
	}

	function toggle() {
		const root = getRoot();
		if (!root) return;
		const isDark = getStore(store);
		if (!isDark) {
			root.classList.add('dark');
			setLocalValue(true);
		} else {
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

	if (!_instance) _instance = api;

	return _instance as ColorModeInstance;
}
