<script lang="ts">
	import { type AccordianOptionProps, accordionOptionDefaults as defaults } from './module';
	import themeStore, { themer, transitioner } from '$lib';
	import type { ElementNativeProps, HTMLTag } from '../../types';
	import { getContext } from 'svelte';
	import type { AccordionPanelContext } from '../AccordionPanel/module';
	import type { AccordionContext } from '../AccordionController/module';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordianOptionProps<Tag> & ElementNativeProps<Tag>;

	const context = getContext('Accordion') as AccordionContext;
	const panelContext = getContext('AccordionPanel') as AccordionPanelContext;

	export let { as, key, size, theme, transition, variant } = {
		...defaults,
		key: panelContext?.key,
		size: context.globals?.size,
		theme: context.globals?.theme,
		transition: context?.globals.transition,
		variant: context?.globals.variant
	} as Required<AccordianOptionProps<Tag>>;

	const th = themer($themeStore);

	$: accordionClasses = th
		.create('AccordianOption')
		.variant('accordionOption', variant, theme, true)
		.option('fieldFontSizes', size, size)
		.append($$restProps.class, true)
		.compile(true);
</script>

{#if $context.selected?.includes(key)}
	<svelte:element
		this={as}
		id={`${key}-accordion-option`}
		aria-labelledby={`${key}-accordion-heading`}
		transition:transitioner={transition}
		{...$$restProps}
		class={accordionClasses}
	>
		<slot />
	</svelte:element>
{/if}
