<script lang="ts">
	import { themeStore, themer } from '$lib/theme';
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
		focustrap,
		opened,
		store: initStore,
		transition
	} = { ...defaults } as Required<$$Props>;

	// let disclosure: HTMLElement | undefined;

	// prevents TS complaint about custom events.
	// should we limit to handful of tags like div, ul, article etc.?
	const element = as as 'div';

	export const store = useDisclosure<{ panel?: HTMLElement }>({ visible: opened });

	setContext('Disclosure', {
		...store,
		focustrap,
		transition,
		open: handleOpen,
		close: handleClose,
		toggle: handleToggle
	});

	const th = themer($themeStore);

	$: disclosureClasses = th
		.create('Disclosure')
		.prepend('disclosure', true)
		.append($$restProps.class, true)
		.compile();

	const clickOutside = createCustomEvent('click', 'click_outside', (e, n) => {
		return (
			(n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible) || false
		);
	});

	function handleOpen() {
		store.open();
		setTimeout(() => {
			$store.panel?.focus();
		});
	}

	function handleClose() {
		store.close();
	}

	function handleToggle() {
		if ($store.visible) {
			handleClose();
		} else {
			handleOpen();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!$store.visible || e.repeat) return;
		const target = e.target as HTMLElement;
		if (e.key === 'Escape' && escapable && (target.matches('body') || target === $store.panel)) {
			e.preventDefault();
			store.close();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:element
	this={element}
	role="presentation"
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	class={disclosureClasses}
>
	<slot open={handleOpen} close={handleClose} toggle={handleToggle} visible={$store?.visible} />
</svelte:element>
