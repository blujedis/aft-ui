<script lang="ts">
	import { type ColormodeProps, colormodDefaults as defaults } from './module';
	import type { ElementProps } from '../../types';
	import { useColorMode, type ColorModeHook } from '../../hooks';
	import type { Unsubscriber } from 'svelte/store';
	// import { writable } from 'svelte/store';
	// import { onMount } from 'svelte';

	type $$Props = ColormodeProps & ElementProps<'input'>;

	export let { modeKey, preferKey } = {
		...defaults
	} as Required<ColormodeProps>;

	const store = useColorMode();
	const { toggle, reset } = store;

	function subscribe(fn: (dark: boolean, api: ColorModeHook) => Unsubscriber) {
		return store.subscribe((s) => fn(s, store));
	}

	// const store = writable<boolean>();

	// function getRoot() {
	// 	if (typeof document === 'undefined') return null;
	// 	return document.documentElement;
	// }

	// function getValue(key: string): boolean {
	// 	if (typeof localStorage === 'undefined') return false;
	// 	return JSON.parse(localStorage.getItem(key) + '');
	// }

	// function setValue(key: string, value: any) {
	// 	if (typeof localStorage === 'undefined') return;
	// 	localStorage.setItem(key, JSON.stringify(value));
	// }

	// function toggle() {
	// 	const root = getRoot();
	// 	if (!root) return null;
	// 	if (!$store) {
	// 		root.classList.add('dark');
	// 		setValue(modeKey, true);
	// 	} else {
	// 		root.classList.remove('dark');
	// 		setValue(modeKey, false);
	// 	}
	// 	store.update((s) => !$store);
	// }

	// function reset() {
	// 	localStorage.removeItem(modeKey);
	// 	store.update((s) => false);
	// }

	// onMount(() => {
	// 	const currentMode = getValue(modeKey);
	// 	store.set(currentMode);
	// });
</script>

<slot {store} checked={$store} {toggle} {reset} {subscribe} />
