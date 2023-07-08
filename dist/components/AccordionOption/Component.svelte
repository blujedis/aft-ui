<script>
	import { slide } from 'svelte/transition';
	import { accordionOptionDefaults as defaults } from './module';
	import themeStore, { themer } from '../..';
	import { getContext } from 'svelte';
	const context = getContext('Accordion');
	const panelContext = getContext('AccordionPanel');
	export let { as, delay, duration, easing, name, size, theme, variant } = {
		...defaults,
		name: panelContext.name,
		size: context.globals.size,
		theme: context.globals.theme,
		variant: context.globals.variant
	};
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
		transition:slide={{ axis: 'y', delay, duration, easing }}
	>
		<slot />
	</svelte:element>
{/if}
