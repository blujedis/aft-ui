<script lang="ts">
	import { type MenuProps, menuDefaults as defaults, type MenuContext } from './module';
	import { themeStore, themer } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { useDisclosure } from '$lib/stores';
	import { setContext } from 'svelte';
	import type { MenuGlobalProps } from '$lib/components/Menu';
	import { cleanObj, createCustomEvent } from '$lib/utils';

	type $$Props = MenuProps & MenuGlobalProps & ElementProps<'div'>;

	export let {
		autoclose,
		escapable,
		disabled,
		full,
		focused,
		hovered,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		underlined,
		variant,
		visible
	} = {
		...defaults
	} as Required<$$Props>;

	export const store = useDisclosure({
		visible
	});

	const th = themer($themeStore);
	let div: HTMLDivElement;

	const globals = cleanObj({
		disabled,
		full,
		focused,
		hovered,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		underlined,
		variant
	});

	setContext('Menu', {
		...store,
		globals
	}) as MenuContext;

	$: menuClasses = th
		.create('Menu')
		.append('w-full', full)
		.append('relative inline-block clear-both', true)
		.append($$restProps.class, true)
		.compile();

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
		if ((e.key === 'Escape' && escapable) || (e.key === 'Tab' && $store.visible))
			return store.close();
		if (!$store.visible && e.key === 'ArrowDown') return store.open();
	}
</script>

<div
	role="none"
	bind:this={div}
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	on:keydown={handleKeydown}
	class={menuClasses}
>
	<slot visible={$store.visible} open={store.open} close={store.close} toggle={store.toggle} />
</div>
