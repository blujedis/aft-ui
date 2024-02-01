<script lang="ts">
	import { type AccordianOptionProps, accordionOptionDefaults as defaults } from './module';
	import { themeStore, themer, transitioner } from '$lib';
	import type { ElementProps, HTMLTag } from '../../types';
	import { getContext, setContext } from 'svelte';

	import type { AccordionContext } from '../Accordion/module';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordianOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('Accordion') as AccordionContext;

	export let { as, unflip, key, rounded, selected, size, theme, transition, variant } = {
		...defaults,
		size: context.globals?.size,
		theme: context.globals?.theme,
		transition: context.globals?.transition,
		variant: context.globals?.variant
	} as Required<AccordianOptionProps<Tag>>;

	setContext('AccordionOption', {
		key
	});

	$context.selected = selected ? [...$context.selected, key] : $context.selected;

	$: isSelected = $context.selected?.includes(key);

	const th = themer($themeStore);

	$: accordionClasses = th
		.create('AccordianOption')
		.variant('accordionOption', variant, theme, variant)
		.option('commonOutlineFocusVisible', theme, isSelected)
		.append(`accordian-option accordion-${variant} outline-none focus-visible:offset-0`, true)
		.append('accordion-expanded', isSelected)
		.append($$restProps.class, true)
		.compile(true);
</script>

<svelte:element
	this={as}
	id={`${key}-accordion-option`}
	aria-labelledby={`${key}-accordion-heading`}
	tabindex="0"
	{...$$restProps}
	class={accordionClasses}
>
	<slot />
</svelte:element>

<style>
	.accordion-outlined.accordion-expanded:not(:last-child) {
		margin-bottom: 6px;
	}
	.accordion-outlined.accordion-expanded:not(:first-child) {
		margin-top: 6px;
	}
</style>
