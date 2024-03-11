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

	type $$Props = DisclosureProps<DisclosureStore, HTMLTag> & DisclosureNativeProps<HTMLTag>;

	export let {
		as,
		autoclose,
		escapable,
		opened,
		store: initStore,
		transition
	} = { ...defaults } as Required<$$Props>;

	let disclosure: HTMLElement | undefined;

	// prevents TS complaint about custom events.
	// should we limit to handful of tags like div, ul, article etc.?
	const element = as as 'div';

	export const store = useDisclosure({ visible: opened });

	setContext('Disclosure', {
		...store,
		transition
	});

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
		return (
			(n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible) || false
		);
	});

	function handleOpen() {
		store.open();
		setTimeout(() => {
			disclosure?.focus();
		});
	}

	function handleClose() {
		store.close();
	}

	function handleToggle() {
		if ($store.visible) handleClose();
		else handleOpen();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!$store.visible || e.repeat) return;
		const target = e.target as HTMLElement;
		if (e.key === 'Escape' && escapable && (target.matches('body') || target === disclosure)) {
			e.preventDefault();
			store.close();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:element
	this={element}
	tabindex="-1"
	role="presentation"
	{...$$restProps}
	bind:this={disclosure}
	use:clickOutside
	on:click_outside={handleClose}
>
	<slot open={handleOpen} close={handleClose} toggle={handleToggle} visible={$store?.visible} />
</svelte:element>
