<script lang="ts">
	import { type MenuPanelProps, menuPanelDefaults as defaults } from './module';
	import { themeStore, themer, transitioner } from '$lib';
	import type { MenuContext } from '../Menu';
	import type { ElementProps } from '../../types';
	import { getContext } from 'svelte';
	import { useFocusNav } from '$lib/hooks';
	import { writable } from 'svelte/store';

	type $$Props = MenuPanelProps & ElementProps<'div'>;

	const context = getContext('Menu') as MenuContext;

	export let { origin, position, rounded, shadowed, theme, transition, variant } = {
		...defaults,
		...context?.globals
	} as Required<MenuPanelProps>;

	const th = themer($themeStore);
	$: ref = writable<HTMLDivElement | undefined>();
	$: nav = useFocusNav($ref?.firstChild);

	$: panelClasses = th
		.create('MenuPanel')
		.variant('globals', 'panel', theme, true)
		.option('roundeds', rounded === 'full' ? 'xl2' : rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append(`dropdown-panel absolute z-30 mt-1 min-w-max focus:outline-none none`, true)
		.append(position === 'right' ? 'right-0' : 'left-0', true)
		.append(origin === 'right' ? 'origin-top-right' : 'origin-top-left', true)
		.append('origin-center', origin === 'center')
		.append($$restProps.class, true)
		.compile(true);

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
