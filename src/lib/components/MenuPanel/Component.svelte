<script lang="ts">
	import { type MenuPanelProps, menuPanelDefaults as defaults } from './module';
	import { themeStore, themer } from '$lib/theme';
	import { transitioner } from '$lib/components/Disclosure';
	import type { MenuContext } from '$lib/components/Menu';
	import type { ElementProps } from '$lib/types';
	import { getContext } from 'svelte';
	import { useFocusNav } from '$lib/hooks';
	import { boolToMapValue } from '$lib/utils';
	import { writable } from 'svelte/store';

	type $$Props = MenuPanelProps & ElementProps<'div'>;
	interface ActiveItem {
		el?: HTMLElement;
		index?: number;
	}

	const context = getContext('Menu') as MenuContext;

	export let { bordered, full, position, rounded, shadowed, theme, transition } = {
		...defaults,
		...context?.globals
	} as Required<MenuPanelProps>;

	// 	import { useFocusNav } from '$lib/hooks';
	// $: nav = useFocusNav($context.panel?.firstChild, {
	// 	onSelected,
	// 	onFind,
	// 	onInit,
	// 	onNavigate
	// });

	const th = themer($themeStore);

	$: ref = writable<HTMLDivElement | undefined>();

	$: nav = useFocusNav($ref?.firstChild, {
		onInit
	});

	$: panelClasses = th
		.create('MenuPanel')
		.option('panelBg', theme, true)
		.option('elementRing', theme, true)
		.option('roundeds', rounded === 'full' ? 'xl2' : boolToMapValue(rounded), rounded)
		.option('elementBorder', theme, bordered)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.prepend('dropdown-panel', true)
		.append('border', bordered)
		.append(`absolute z-30 mt-1 min-w-max focus:outline-none none`, true)
		.append(position === 'right' ? 'right-0' : 'left-0', true)
		.append(position === 'right' ? 'origin-top-right' : 'origin-top-left', true)
		.append('origin-center', full)
		.append($$restProps.class, true)
		.compile();

	$: activeItem = { el: undefined, index: undefined } as ActiveItem;

	function onInit(items = [] as HTMLElement[]) {
		if (!items.length) return;
		activeItem = items.reduce(
			(a, c, i) => {
				if (c.classList.contains('menu-option-active')) {
					a.el = c;
					a.index = Math.max(0, i - 1);
				}
				return a;
			},
			{ el: undefined, index: undefined } as ActiveItem
		);
		if (!activeItem.el)
			// just focus on first option item if none selected.
			activeItem = { el: items[0], index: 0 };
		activeItem.el?.focus();
	}

	function setFocus(el: HTMLElement) {
		el.focus();
	}
</script>

{#if $context.visible}
	<div
		role="menu"
		tabindex="-1"
		{...$$restProps}
		aria-orientation="vertical"
		bind:this={$ref}
		use:setFocus
		on:keydown={nav.onKeydown}
		transition:transitioner={transition}
		class={panelClasses}
	>
		<div class="py-1" role="none">
			<slot />
		</div>
	</div>
{/if}
