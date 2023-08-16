<script lang="ts">
	import { type AccordianOptionProps, accordionOptionDefaults as defaults } from './module';
	import { themeStore, themer, transitioner } from '$lib';
	import type { ElementProps, HTMLTag } from '../../types';
	import { getContext } from 'svelte';
	import type { AccordionPanelContext } from '../AccordionPanel/module';
	import type { AccordionContext } from '../Accordion/module';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordianOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('Accordion') as AccordionContext;
	const panelContext = getContext('AccordionPanel') as AccordionPanelContext;

	export let { as, key, rounded, size, theme, transition } = {
		...defaults,
		key: panelContext?.key,
		size: context.globals?.size,
		theme: context.globals?.theme,
		transition: context?.globals.transition
	} as Required<AccordianOptionProps<Tag>>;

	const th = themer($themeStore);

	$: accordionClasses = th
		.create('AccordianOption')
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
