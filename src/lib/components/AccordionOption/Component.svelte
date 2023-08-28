<script lang="ts">
	import { type AccordianOptionProps, accordionOptionDefaults as defaults } from './module';
	import { themeStore, themer, transitioner } from '$lib';
	import type { ElementProps, HTMLTag } from '../../types';
	import { getContext, setContext } from 'svelte';

	import type { AccordionContext } from '../Accordion/module';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordianOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('Accordion') as AccordionContext;

	export let { as, unflip, key, rounded, size, theme, transition } = {
		...defaults,
		size: context.globals?.size,
		theme: context.globals?.theme,
		transition: context?.globals.transition
	} as Required<AccordianOptionProps<Tag>>;

	setContext('AccordionOption', {
		key
	});

	const th = themer($themeStore);

	$: accordionClasses = th.create('AccordianOption').append($$restProps.class, true).compile(true);
</script>

<svelte:element
	this={as}
	id={`${key}-accordion-option`}
	aria-labelledby={`${key}-accordion-heading`}
	{...$$restProps}
	class={accordionClasses}
>
	<slot />
</svelte:element>
