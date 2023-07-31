<script lang="ts">
	import themeStore, { themer } from '$lib';
	import Button from '../Button';
	import Icon from '../Icon';
	import { getContext } from 'svelte';
	import type { AccordionPanelContext } from '../AccordionPanel/module';
	import type { AccordionContext } from '../Accordion/module';
	import ConditionalElement from '../ConditionalElement';
	import { type AccordianButtonProps, accordionButtonDefaults as defaults } from './module';
	import type { ElementNativeProps, IconifyTuple } from '../../types';

	type $$Props = AccordianButtonProps & ElementNativeProps<'button'>;

	const context = getContext('Accordion') as AccordionContext;
	const panelContext = getContext('AccordionPanel') as AccordionPanelContext;

	export let {
		caret,
		disabled,
		focused,
		htag,
		key,
		roticon,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant
	} = {
		...defaults,
		key: panelContext.key,
		rounded: context.globals.rounded,
		shadowed: context.globals.shadowed,
		size: context.globals.size,
		theme: context.globals.theme,
		variant: context.globals.variant
	} as Required<AccordianButtonProps>;

	$: isSelected = $context.selected?.includes(key);
	$: icons = (Array.isArray(caret) ? caret : [caret, caret]) as IconifyTuple;
	$: activeIcon = roticon ? icons[0] : !isSelected ? icons[0] : icons[1];

	const th = themer($themeStore);

	$: accordionButtonClasses = th
		.create('Accordion')
		.variant('accordionButton', variant, theme, true)
		.option('focusedRingVisible', theme, focused)
		.option('common', 'transition', transitioned)
		.option('fieldFontSizes', size, size)
		.option('buttonPadding', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed && variant === 'pills')
		.option('disableds', theme, disabled)
		.append('inline-flex items-center justify-center focus:outline-none focus:ring-2', true)
		.append('inline-flex items-center justify-between w-full', true)
		.append($$restProps.class, true)
		.compile(true);

	$: iconClasses = th
		.create('DropdownButtonIcon')
		.option('iconCaretSizes', size, true)
		.append('transition-transform duration-300 origin-center', roticon)
		.append(typeof roticon === 'string' ? roticon : '-rotate-180', isSelected && roticon)
		.compile();
</script>

<ConditionalElement as={htag} condition={typeof htag === 'string'}>
	<button
		id={`${key}-accordion-heading`}
		aria-controls={`${key}-accordion-option`}
		{...$$restProps}
		on:click={() => context.toggle(key)}
		class={accordionButtonClasses}
		aria-expanded={isSelected}
	>
		<div>
			<slot />
		</div>
		{#if activeIcon}
			<slot name="caret">
				<svelte:component this={Icon} icon={activeIcon} class={iconClasses} />
			</slot>
		{/if}
	</button>
</ConditionalElement>
