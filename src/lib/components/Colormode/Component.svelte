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

<slot {store} dark={$store} {set} {toggle} {reset} {subscribe} />
