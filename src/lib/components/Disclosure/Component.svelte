<script lang="ts">
	import { createCustomEvent } from '$lib/utils';
	import { setContext } from 'svelte';
	import {
		type DisclosureProps,
		type DisclosureNativeProps,
		disclosureDefaults as defaults
	} from './module';
	import type { HTMLTag } from '$lib/types';
	import { useDisclosure, type DisclosureStore } from '$lib/stores';

	type Tag = $$Generic<HTMLTag>;
	type Store = $$Generic<DisclosureStore>;

	type $$Props = DisclosureProps<Store, HTMLTag> & DisclosureNativeProps<HTMLTag>;

	export let {
		as,
		autoclose,
		escapable,
		opened,
		store: initStore,
		transition
	} = { ...defaults } as Required<$$Props>;

	// prevents TS complaint about custom events.
	// should we limit to handful of tags like div, ul, article etc.?
	const element = as as 'div';

	export const store = (initStore || useDisclosure({ visible: opened })) as Store;

	setContext('Disclosure', {
		...store,
		transition
	});

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
		return (
			(n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible) || false
		);
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleClose(e?: Event) {
		store.close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!e.repeat && e.key === 'Escape' && escapable) {
			store.close();
		}
	}
</script>

<svelte:element
	this={element}
	role="presentation"
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	on:keydown={handleKeydown}
>
	<slot open={store?.open} close={store?.close} toggle={store?.toggle} visible={$store?.visible} />
</svelte:element>
