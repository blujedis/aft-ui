<script lang="ts">
	import { type SelectListPanelProps, selectListPanelDefaults as defaults } from './module';
	import { themeStore, themer, transitioner } from '$lib';
	import type { SelectListContext, SelectListItem } from '../SelectList';
	import type { ElementProps } from '../../types';
	import { getContext } from 'svelte';
	import { useFocusNav } from '$lib/hooks';

	type $$Props = SelectListPanelProps & ElementProps<'div'>;

	const context = getContext('SelectListContext') as SelectListContext;

	export let { origin, position, rounded, shadowed, theme, transition, variant } = {
		...defaults,
		...context?.globals
	} as Required<SelectListPanelProps>;

	const th = themer($themeStore);

	$: nav = useFocusNav($context.panel?.firstChild);
	$: selected = $context.selected.map((v) =>
		$context.items.find((item) => item.value === v)
	) as SelectListItem[];

	nav?.onSelected((el) => {
		const key = el.dataset.key as string;
		if (!context.globals.tags && $context.input) {
			const labels = selected.map((i) => i.label).filter((l) => typeof l !== 'undefined');
			setTimeout(() => {
				if ($context.input) $context.input.value = labels.join(', ');
			});
		} else {
			if (context.isSelected(key)) {
				setTimeout(() => context.unselect(key));
			} else if (key) {
				setTimeout(() => context.select(key));
			}
		}
	});

	$: panelClasses = th
		.create('SelectListPanel')
		.variant('selectListPanel', variant, theme, variant)
		.option('roundeds', rounded === 'full' ? 'xl2' : rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append(`dropdown-panel absolute z-30 mt-1 min-w-max text-left`, true)
		.append(position === 'right' ? 'right-0' : 'left-0', true)
		.append(origin === 'right' ? 'origin-top-right' : 'origin-top-left', true)
		.append('origin-center', origin === 'center')
		.append('w-full', context.globals.full)
		.append($$restProps.class, true)
		.compile(true);

	function setFocus(el: HTMLElement) {
		el.focus();
	}
</script>

{#if $context.visible}
	<div
		role="listbox"
		tabindex="-1"
		{...$$restProps}
		aria-orientation="vertical"
		bind:this={$context.panel}
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
