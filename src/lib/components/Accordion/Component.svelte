<script lang="ts">
	import {
		type AccordionProps,
		accordionDefaults as defaults,
		type AccordionContext
	} from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementNativeProps, HTMLTag } from '../../types';
	import { useSelect } from '$lib/stores/select';
	import { setContext } from 'svelte';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordionProps<Tag> & ElementNativeProps<Tag>;

	export let { as, full, multiple, selected, rounded, shadowed, size, theme, variant } = {
		...defaults
	} as Required<AccordionProps<Tag>>;

	export const store = useSelect({ multiple, selected });

	setContext('Accordion', {
		...store,
		globals: {
			rounded: variant === 'pills' ? rounded : 'none',
			shadowed,
			size,
			theme,
			variant
		}
	}) as AccordionContext;

	const th = themer($themeStore);

	if (rounded === 'full' && variant !== 'pills')
		console.warn(`Rounded downgraded to "xl2", full not supported by variant "${variant}".`);

	$: accordionClasses = th
		.create('Accordion')
		.variant('accordion', variant, theme, true)
		.option('roundeds', rounded === 'full' && variant !== 'pills' ? 'xl2' : rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append($$restProps.class, true)
		.compile(true);
</script>

<svelte:element
	this={as}
	{...$$restProps}
	aria-expanded={$store.selected.length > 0}
	class={accordionClasses}
>
	<slot
		select={store.select}
		unselect={store.unselect}
		reset={store.reset}
		isSelected={store.isSelected}
		selectedItems={$store.selected}
	/>
</svelte:element>
