<script lang="ts">
	import { useColorMode, type ColorModeHook } from '$lib/hooks';
	import type { Unsubscriber } from 'svelte/store';

	export let prefers = undefined as 'light' | 'dark' | undefined;
	export let init = false;

	const store = useColorMode(init, prefers);
	const { set, toggle, reset } = store;

	function subscribe(fn: (dark: boolean, api: ColorModeHook) => Unsubscriber) {
		return store.subscribe((s) => fn(s, store));
	}
</script>

<svelte:head>
	<script>
		let darkMode = false;
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (localStorage.darkmode === 'true' || (!('darkmode' in localStorage) && prefersDark)) {
			darkMode = true;
		} else {
			const currentDark = JSON.parse(localStorage['darkmode'] || 'false');
			if (currentDark) darkMode = true;
			else darkMode = false;
		}

		if (darkMode) document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
		localStorage.setItem('preferdark', prefersDark);
		localStorage.setItem('darkmode', darkMode);
	</script>
</svelte:head>

<slot {store} dark={$store} {set} {toggle} {reset} {subscribe} />
