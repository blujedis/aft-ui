<script lang="ts">
	import { type ColormodeProps, colormodDefaults as defaults } from './module';
	import type { ElementProps } from '../../types';
	import { useColorMode, type ColorModeHook } from '../../hooks';
	import type { Unsubscriber } from 'svelte/store';

	type $$Props = ColormodeProps & ElementProps<'input'>;

	export let { modeKey, preferKey } = {
		...defaults
	} as Required<ColormodeProps>;

	const store = useColorMode();
	const { toggle, reset } = store;

	function subscribe(fn: (dark: boolean, api: ColorModeHook) => Unsubscriber) {
		return store.subscribe((s) => fn(s, store));
	}
</script>

<slot {store} checked={$store} {toggle} {reset} {subscribe} />
