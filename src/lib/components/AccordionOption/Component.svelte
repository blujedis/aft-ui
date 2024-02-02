<script lang="ts">
	import { type AccordianOptionProps, accordionOptionDefaults as defaults } from './module';
	import { themeStore, themer } from '$lib/theme';
	import type { ElementProps, HTMLTag } from '$lib/types';
	import { getContext, setContext } from 'svelte';
	// import { transitioner } from '$lib/components';

	import type { AccordionContext } from '../Accordion/module';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordianOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('Accordion') as AccordionContext;

	export let { as, focused, key, rounded, selected, size, theme, transition, unflip, variant } = {
		...defaults,
		focused: context.globals?.focused,
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
		.option('commonRingFocusVisible', theme, true)
		.option('common', 'bordered', variant === 'filled' && $context.selected.length)
		.prepend(`accordian-option accordion-${variant}`, true)
		.prepend('accordion-collapsed', !isSelected)
		.prepend('accordion-expanded', isSelected)
		.append(`outline-none transition-[margin]`, true)
		.append(`focus-visible:ring-4 focus-visible:ring-inset`, true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<svelte:element
	this={as}
	id={`${key}-accordion-option`}
	aria-labelledby={`${key}-accordion-heading`}
	tabindex={isSelected ? 0 : -1}
	{...$$restProps}
	class={accordionClasses}
>
	<slot />
</svelte:element>

<style>
	.accordion-filled.accordion-expanded:not(:last-child) {
		margin-bottom: 6px;
	}
	.accordion-filled.accordion-expanded:not(:first-child) {
		margin-top: 6px;
	}
</style>
