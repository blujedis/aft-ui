<script lang="ts">
	import { themer, themeStore } from '$lib/theme';
	import { Icon } from '../Icon';
	import { getContext } from 'svelte';
	import type { AccordionOptionContext } from '../AccordionOption/module';
	import type { AccordionContext } from '../Accordion/module';
	import { type AccordianButtonProps, accordionButtonDefaults as defaults } from './module';
	import type { ElementProps, IconifyTuple, HTMLTag } from '$lib/types';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = AccordianButtonProps<Tag> & ElementProps<Tag>;

	const context = getContext('Accordion') as AccordionContext;
	const optionContext = getContext('AccordionOption') as AccordionOptionContext;

	export let {
		as,
		caret,
		disabled,
		hovered,
		key,
		roticon,
		rotiangle,
		selectable,
		size,
		theme,
		transitioned,
		variant
	} = {
		...defaults,
		key: optionContext.key,
		hovered: context.globals?.hovered,
		selectable: context.globals?.selectable,
		size: context.globals?.size,
		theme: context.globals?.theme,
		variant: context.globals?.variant
	} as Required<AccordianButtonProps<Tag>>;

	$: isSelected = $context.selected?.includes(key);
	$: icons = (Array.isArray(caret) ? caret : [caret, caret]) as IconifyTuple;
	$: activeIcon = roticon ? icons[0] : !isSelected ? icons[0] : icons[1];

	const th = themer($themeStore);

	$: accordionButtonClasses = th
		.create('AccordionButton')
		.bundle(
			['selectedBgAriaExpanded', 'selectedWhiteTextAriaExpanded'],
			theme,
			variant === 'filled' && selectable
		)
		.bundle(['selectedTextAriaExpanded'], theme, selectable && variant !== 'filled')
		.option('common', 'transitioned', transitioned)
		.option('common', 'disabled', disabled)
		.option('fieldFontSizes', size, size)
		.option('buttonPadding', size, size)
		.option('panelAccordionBg', theme, variant === 'filled')
		.option('panelAccordionBgHover', theme, hovered && !isSelected)
		.prepend('accordion-button', true)
		.append('inline-flex items-center justify-between w-full focus:outline-none', true)
		.append($$restProps.class, true)
		.compile();

	$: iconClasses = th
		.create('DropdownButtonIcon')
		.option('iconCaretSizes', size, true)
		.prepend('accordion-caret', true)
		.append('transition-transform duration-300 origin-center', roticon)
		.append(
			typeof roticon === 'string' ? roticon : rotiangle === 180 ? '-rotate-180' : 'rotate-90',
			isSelected && roticon
		)
		.compile();

	const additionalProps = {
		disabled
	};
</script>

<svelte:element
	this={as}
	id={`${key}-accordion-heading`}
	aria-controls={`${key}-accordion-option`}
	role="button"
	tabindex={-1}
	{...$$restProps}
	{...additionalProps}
	aria-expanded={isSelected}
	aria-disabled={disabled}
	class={accordionButtonClasses}
	on:click={() => context.toggle(key)}
>
	<div>
		<slot />
	</div>
	{#if activeIcon}
		<slot name="caret">
			<svelte:component this={Icon} icon={activeIcon} class={iconClasses} />
		</slot>
	{/if}
</svelte:element>
