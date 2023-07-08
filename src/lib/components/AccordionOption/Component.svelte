<script lang="ts">
	import { slide } from 'svelte/transition';
	import { type AccordianOptionProps, accordionOptionDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementNativeProps, HTMLTag } from '../types';
	import { getContext } from 'svelte';
	import type { AccordionPanelContext } from '../AccordionPanel/module';
	import type { AccordionContext } from '../Accordion/module';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordianOptionProps<Tag> & ElementNativeProps<Tag>;

	const context = getContext('Accordion') as AccordionContext;
	const panelContext = getContext('AccordionPanel') as AccordionPanelContext;

	export let { as, delay, duration, easing, name, size, theme, variant } = {
		...defaults,
		name: panelContext.name,
		size: context.globals.size,
		theme: context.globals.theme,
		variant: context.globals.variant
	} as Required<AccordianOptionProps<Tag>>;

	const th = themer($themeStore);

	$: accordionClasses = th
		.create('AccordianOption')
		.variant('accordionOption', variant, theme, true)
		.option('fieldFontSizes', size, size)
		.append($$restProps.class, true)
		.compile(true);
</script>

{#if $context.selected?.includes(name)}
	<svelte:element
		this={as}
		id={`${name}-accordion-option`}
		aria-labelledby={`${name}-accordion-heading`}
		{...$$restProps}
		class={accordionClasses}
		transition:slide|global={{ axis: 'y', delay, duration, easing }}
	>
		<slot />
	</svelte:element>
{/if}
