<script lang="ts">
	import themeStore, { themer } from '$lib';
	import Button from '../Button';
	import Icon from '../Icon';
	import { getContext } from 'svelte';
	import type { AccordionPanelContext } from '../AccordionPanel/module';
	import type { AccordionContext } from '../Accordion/module';
	import ConditionalElement from '../ConditionalElement';
	import {
		type AccordianButtonProps,
		accordionButtonDefaults as defaults,
		type AccordionButtonIcon
	} from './module';
	import type { ElementNativeProps } from '../../types';

	type $$Props = AccordianButtonProps & ElementNativeProps<'button'>;

	const context = getContext('Accordion') as AccordionContext;
	const panelContext = getContext('AccordionPanel') as AccordionPanelContext;

	export let { icon, htag, name, roticon, rounded, size, theme, variant } = {
		...defaults,
		name: panelContext.name,
		rounded: context.globals.rounded,
		size: context.globals.size,
		theme: context.globals.theme,
		variant: context.globals.variant
	} as Required<AccordianButtonProps>;

	$: isSelected = $context.selected?.includes(name);
	$: icons = (Array.isArray(icon) ? icon : [icon, icon]) as [
		AccordionButtonIcon,
		AccordionButtonIcon
	];
	$: activeIcon = roticon ? icons[0] : !isSelected ? icons[0] : icons[1];

	const th = themer($themeStore);

	$: accordionButtonClasses = th
		.create('Accordion')
		.variant('accordionButton', variant, theme, true)
		.append('inline-flex items-center justify-between w-full', true)
		.append('mb-2', variant === 'pills')
		.append($$restProps.class, true)
		.compile(true);
	$: iconClasses = th
		.create('DropdownButtonIcon')
		.option('iconSizes', size, true)
		.append('transition-transform duration-300 origin-center', roticon)
		.append(typeof roticon === 'string' ? roticon : '-rotate-180', isSelected && roticon)
		.compile();
</script>

<ConditionalElement as={htag} condition={typeof htag === 'string'}>
	<Button
		id={`${name}-accordion-heading`}
		aria-controls={`${name}-accordion-option`}
		{...$$restProps}
		unstyled
		on:click={() => context.toggle(name)}
		class={accordionButtonClasses}
		aria-expanded={isSelected}
		mode="text"
		{rounded}
		{size}
	>
		<div>
			<slot />
		</div>
		{#if activeIcon}
			<slot name="icon">
				<Icon icon={activeIcon} class={iconClasses} />
			</slot>
		{/if}
	</Button>
</ConditionalElement>
