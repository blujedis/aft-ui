import { writable, type Writable, get as getStore } from 'svelte/store';
import { browser } from '$app/environment';

export type ColorModeHook = ReturnType<typeof useColorMode>;

const key = 'darkmode';

const store = writable<boolean>((browser && JSON.parse(localStorage.getItem(key) || 'false')) || false);
const prefersDark = browser && window.matchMedia('(prefers-color-scheme: dark)').matches || false;

export function useColorMode(shouldInit = false, prefers?: 'light' | 'dark') {

	type ColorModeInstance = Writable<boolean> & typeof methods;

	if (typeof prefers === 'undefined')
		prefers = prefersDark ? 'dark' : 'light';

	const methods = {
		getRoot,
		getLocalValue,
		setLocalValue,
		set,
		toggle,
		reset
	};

	function getRoot() {
		if (typeof document === 'undefined') return null;
		return document.documentElement;
	}

	function getLocalValue(): boolean | null {
		if (typeof localStorage === 'undefined' || !key) return null;
		const currentValue = JSON.parse(localStorage.getItem(key) || '');
		if (!currentValue) return null;
		return currentValue;
	}

	function setLocalValue(value: boolean) {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem(key, JSON.stringify(value));
	}

	function applyMode(value: boolean) {
		const root = getRoot();
		if (!root) return;
		if (value)
			root.classList.add('dark')
		else
			root.classList.remove('dark');
		setLocalValue(value);
	}

	function set(isDark = false) {
		const root = getRoot();
		if (!root) return;
		store.update((_s) => {
			applyMode(isDark);
			return isDark;
		});
	}

	function toggle() {
		const root = getRoot();
		if (!root) return;
		store.update(isDark => {
			const nextValue = !isDark;
			applyMode(nextValue);
			return nextValue;
		});
	}

	function reset() {
		const root = getRoot();
		if (root)
			root.classList.remove('dark');
		localStorage.removeItem(key);
		store.update((_s) => false);
	}

	function init() {
		if (!shouldInit) return;
		set(prefers === 'light' ? false : true);
	}

	init();

	const api = {
		...methods,
		...store
	};

	return api as ColorModeInstance;

}
