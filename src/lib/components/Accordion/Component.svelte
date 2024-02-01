<script lang="ts">
	import { cleanObj } from '$lib/utils';

	import {
		type AccordionProps,
		accordionDefaults as defaults,
		type AccordionContext
	} from './module';
	import { themer, themeStore } from '../../theme';
	import type { ElementProps, HTMLTag } from '../../types';
	import { useSelect } from '$lib/stores/select';
	import { setContext } from 'svelte';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordionProps<Tag> & ElementProps<Tag>;

	export let {
		as,
		hovered,
		multiple,
		selected,
		rounded,
		shadowed,
		size,
		theme,
		transition,
		variant
	} = {
		...defaults
	} as Required<AccordionProps<Tag>>;

	export const store = useSelect({ multiple, selected });

	const globals = cleanObj({
		hovered,
		rounded,
		shadowed,
		size,
		theme,
		transition,
		variant
	});

	setContext('Accordion', {
		...store,
		globals
	}) as AccordionContext;

	const th = themer($themeStore);

	if (rounded === 'full')
		console.warn(`Rounded downgraded to "xl2", full not supported by variant "${variant}".`);

	$: accordionClasses = th
		.create('Accordion')
		.option('roundeds', rounded === 'full' ? 'xl2' : rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('common', 'bordered', variant === 'outlined')
		.option('common', 'divided', true)
		.append(`accordion`, true)
		// .append('overflow-clip', variant !== 'flat')
		.append('divide-y', true)
		.append('border', variant === 'outlined')
		.append($$restProps.class, true)
		.compile(true);

	function handleReset() {}
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
		reset={handleReset}
		isSelected={store.isSelected}
		selectedItems={$store.selected}
	/>
</svelte:element>
