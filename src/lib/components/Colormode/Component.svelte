<script lang="ts">
	import { type ColormodeProps, colormodDefaults as defaults } from './module';
	import type { ElementProps } from '../../types';
	import { writable } from 'svelte/store';

	type $$Props = ColormodeProps & ElementProps<'input'>;

	export let { modeKey, preferKey } = {
		...defaults
	} as Required<ColormodeProps>;

	const store = writable<boolean>(getValue(modeKey));

	function getRoot() {
		if (typeof document === 'undefined') return null;
		return document.documentElement;
	}

	function getValue(key: string): boolean {
		if (typeof localStorage === 'undefined') return false;
		return JSON.parse(localStorage.getItem(key) + '');
	}

	function setValue(key: string, value: any) {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem(key, JSON.stringify(value));
	}

	function toggle() {
		const root = getRoot();
		if (!root) return;
		if (!$store) {
			root.classList.add('dark');
			setValue(modeKey, true);
		} else {
			root.classList.remove('dark');
			setValue(modeKey, false);
		}
		store.update((s) => !$store);
	}

	function reset() {
		localStorage.removeItem(modeKey);
		store.update((s) => false);
	}
</script>

<slot checked={$store} {toggle} {reset} />
