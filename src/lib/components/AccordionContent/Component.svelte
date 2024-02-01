<script lang="ts">
	import { transitioner } from '../Disclosure';
	import type { AccordionOptionContext } from '../AccordionOption';
	import type { AccordionContext } from '../Accordion/module';
	import { getContext } from 'svelte';
	import { type AccordionContentProps, accordionContentDefaults as defaults } from './module';
	import { themer, themeStore } from '../../theme';
	import type { ElementProps, HTMLTag } from '../../types';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordionContentProps<Tag> & ElementProps<Tag>;

	const context = getContext('Accordion') as AccordionContext;
	const optionContext = getContext('AccordionOption') as AccordionOptionContext;

	export let { as, key, size, theme, transition, variant } = {
		...defaults,
		key: optionContext?.key,
		size: context?.globals.size,
		theme: context?.globals.theme,
		variant: context?.globals.variant
	} as Required<AccordionContentProps<Tag>>;

	$: isSelected = $context.selected.includes(key);

	const th = themer($themeStore);

	$: accordionContentClasses = th
		.create('AccordionContent')
		.option('fieldFontSizes', size, size)
		.option('buttonPadding', size, size)
		.append(`accordion-content`, true)
		.append($$restProps.class, true)
		.compile(true);
</script>

{#if isSelected}
	<svelte:element
		this={as}
		{...$$restProps}
		class={accordionContentClasses}
		transition:transitioner={transition}
	>
		<slot />
	</svelte:element>
{/if}
