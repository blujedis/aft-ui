<script lang="ts">
	import { themer, themeStore } from '../../theme';
	import { Icon } from '../Icon';
	import { getContext } from 'svelte';
	import type { AccordionOptionContext } from '../AccordionOption/module';
	import type { AccordionContext } from '../Accordion/module';
	import { type AccordianButtonProps, accordionButtonDefaults as defaults } from './module';
	import type { ElementProps, IconifyTuple } from '../../types';

	type $$Props = AccordianButtonProps & ElementProps<'button'>;

	const context = getContext('Accordion') as AccordionContext;
	const optionContext = getContext('AccordionOption') as AccordionOptionContext;

	export let {
		caret,
		disabled,
		focused,
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
		key: optionContext.key,
		rounded: context.globals?.rounded,
		shadowed: context.globals?.shadowed,
		size: context.globals?.size,
		theme: context.globals?.theme,
		variant: context.globals?.variant
	} as Required<AccordianButtonProps>;

	$: isSelected = $context.selected?.includes(key);
	$: icons = (Array.isArray(caret) ? caret : [caret, caret]) as IconifyTuple;
	$: activeIcon = roticon ? icons[0] : !isSelected ? icons[0] : icons[1];

	const th = themer($themeStore);

	$: accordionButtonClasses = th
		.create('AccordionButton')
		.variant('accordionButton', variant, theme, variant)
		.option('common', 'transitioned', transitioned)
		.option('common', 'disabled', disabled)
		.option('fieldFontSizes', size, size)
		.option('buttonPadding', size, size)
		.option('common', 'baseFill', variant === 'filled' || variant === 'grouped')
		.prepend('accordion-button', true)
		.append(
			'inline-flex items-center justify-between w-full focus:outline-none',
			true
		)
		.append($$restProps.class, true)
		.compile(true);

	$: iconClasses = th
		.create('DropdownButtonIcon')
		.option('iconCaretSizes', size, true)
		.append('transition-transform duration-300 origin-center', roticon)
		.append(typeof roticon === 'string' ? roticon : '-rotate-180', isSelected && roticon)
		.compile();
</script>

<button
	id={`${key}-accordion-heading`}
	aria-controls={`${key}-accordion-option`}
	{...$$restProps}
	tabindex={-1}
	on:click={() => context.toggle(key)}
	class={accordionButtonClasses}
	{disabled}
	aria-expanded={isSelected}
	aria-disabled={disabled}
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
