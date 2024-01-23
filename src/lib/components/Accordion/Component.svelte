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

	export let { as, multiple, selected, rounded, shadowed, size, theme, transition, variant } = {
		...defaults
	} as Required<AccordionProps<Tag>>;

	export const store = useSelect({ multiple, selected });

	const globals = cleanObj({
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

	if (rounded === 'full' && variant !== 'filled')
		console.warn(`Rounded downgraded to "xl2", full not supported by variant "${variant}".`);

	$: accordionClasses = th
		.create('Accordion')
		.option('roundeds', rounded === 'full' ? 'xl2' : rounded, rounded && variant !== 'flushed')
		.option('shadows', shadowed, shadowed && variant !== 'filled')
		.option('common', 'bordered', variant === 'outlined')
		.option('common', 'divided', variant !== 'flushed')
		.append('divide-y border', variant === 'outlined')
		//.append('divide-y', variant === 'filled')
		.append('rounded-none', variant === 'flushed')
		.append('overflow-clip', true)
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
