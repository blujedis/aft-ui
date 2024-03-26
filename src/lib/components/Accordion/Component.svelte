<script lang="ts">
	import { cleanObj } from '$lib/utils';
	import {
		type AccordionProps,
		accordionDefaults as defaults,
		type AccordionContext
	} from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps, HTMLTag } from '$lib/types';
	import { useSelect } from '$lib/stores/select';
	import { setContext } from 'svelte';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordionProps<Tag> & ElementProps<Tag>;

	export let {
		as,
		bordered,
		detached,
		focused,
		hovered,
		multiple,
		rounded,
		selected,
		selectable,
		shadowed,
		size,
		theme,
		transition,
		transitioned,
		variant
	} = {
		...$themeStore.defaults?.component,
		...defaults
	} as Required<AccordionProps<Tag>>;

	export const store = useSelect({ mode: 'multiple', selected });

	const globals = cleanObj({
		bordered,
		detached,
		hovered,
		focused,
		rounded,
		selectable,
		shadowed,
		size,
		theme,
		transition,
		transitioned,
		variant
	});

	setContext('Accordion', {
		...store,
		globals
	}) as unknown as AccordionContext; // need to review these types.

	const th = themer($themeStore);

	if (rounded === 'full')
		console.warn(`Rounded downgraded to "xl2", full not supported by variant "${variant}".`);

	$: accordionClasses = th
		.create('Accordion')
		.option('elementDivide', theme,  variant === 'filled')
		.append('divide-y', variant === 'filled')
		.prepend(`accordion`, true)
		.append($$restProps.class, true)
		.compile();

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
		selectedItems={$store.selected}
	/>
</svelte:element>
