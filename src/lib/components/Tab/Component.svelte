<script lang="ts">
	import { get_current_component } from 'svelte/internal';
	import { Flushed } from '../Flushed';
	import { ConditionalElement } from '../ConditionalElement';
	import { themer, themeStore } from '$lib/theme';
	import { type TabProps, tabDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';
	import { getContext } from 'svelte';
	import type { TabsContext } from '$lib/components/Tabs';
	import type { SelectStoreValue } from '$lib/stores/select';
	import { boolToMapValue, forwardEventsBuilder } from '$lib/utils';

	type Tag = $$Generic<'a' | 'button'>;
	type $$Props = TabProps<Tag> & ElementProps<Tag>;

	const context = getContext('Tabs') as TabsContext;

	export let {
		as,
		disabled,
		focused,
		full,
		hovered,
		rounded,
		selected,
		size,
		theme,
		title,
		transitioned,
		underlined,
		value,
		variant
	} = {
		...defaults,
		focused: context.globals?.focused,
		full: context.globals?.full,
		hovered: context.globals?.hovered,
		rounded: context.globals?.rounded,
		size: context.globals?.size,
		theme: context.globals?.theme,
		transitioned: context.globals?.transitioned,
		variant: context.globals?.variant,
	} as Required<TabProps<Tag>>;

	let panel: HTMLDivElement | undefined;

	const additionalProps = {
		disabled,
		'aria-disabled': disabled
	};

	const th = themer($themeStore);

	// $: isSelected = $context.selected?.includes(value);

	$: tabClasses = th
		.create('Tab')
		// .variant('tab', '', theme, true)

		// .bundle(
		// 	['selectedBgAriaExpanded', 'selectedWhiteTextAriaExpanded'],
		// 	theme,
		// 	variant === 'filled' && selectable
		// )
		// .bundle(['selectedTextAriaExpanded'], theme, selectable && variant !== 'filled')
		.option('common', 'transitioned', transitioned)
		.option('common', 'disabled', disabled)
		.option('panelAccordionBg', theme, variant === 'filled')
		.option('panelAccordionBgHover', theme, hovered) // !isSelected.

		.option('hovered', variant, theme, hovered)
		// .option('common', 'focusedOutlineVisible', focused)
		// .option('outlineFocusVisible', theme, focused)
		// .option('common', 'transitioned', transitioned)

		// .option('dropshadows', boolToMapValue(shadowed), shadowed)
		// .option('outlineFocusVisible', theme, focused)
		// .option('common', 'focusedOutlineVisible', focused)

		.option('buttonPadding', size, size)
		.option('fieldFontSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.append(
			'rounded-br-none rounded-bl-none',
			['text', 'filled', 'flushed'].includes(variant)
		)
		.append('w-full', full && ['grouped', 'text'].includes(variant))
		.append('px-10', full && ['pills', 'flushed', 'filled'].includes(variant))
		.append('whitespace-nowrap', variant === 'flushed')
		.append(
			'relative focus:z-10 first:ml-0 -ml-px first:ml-0 first:rounded-r-none last:rounded-l-none',
			variant === 'outlined'
		)
		.append('inline-flex items-center justify-center', true)
		.append($$restProps.class, true)
		.compile();

	// function handleSelect(value: SelectStoreValue) {
	// 	if ($context?.selected?.includes(value)) context.unselect(value);
	// 	else context.select(value);
	// }

  function mount(node: HTMLElement) {
    context.update(s => { 
			if (!s.nodes.includes(node))
			s.nodes = [...s.nodes, node];
			return { ...s, selected: node };
		})
    const destroy = context.subscribe(s => { 
      if (s.selected !== node) 
        selected = false;
    });
    return { destroy };
  }

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<li role="presentation">
	<ConditionalElement
		as={Flushed}
		condition={variant === 'flushed'}
		props={{
			selected,
			theme,
			group: true,
			hovered,
			focused
		}}
>
	<svelte:element
		use:forwardedEvents
		this={as}
		id={`tab-${0}`}
		aria-controls={`tabpanel-${0}`}
		{...$$restProps}
		{...additionalProps}
		role="tab"
		tabindex="-1"
		class=""
		aria-current={selected}
		aria-selected={selected}
		on:click={() => selected = true}
	>
		<slot name="title">
			{title}
		</slot>
	</svelte:element>

	<!-- <svelte:element
		this={as}
		aria-labelledby={value + ''}
		{...$$restProps}
		{...additionalProps}
		role={as === 'a' ? 'link' : 'button'}
		tabindex="-1"
		class={tabClasses}
		aria-current={isSelected}
		aria-selected={isSelected}
		on:click={() => handleSelect(value)}
	>
		<slot />
	</svelte:element> -->

</ConditionalElement>
	{#if selected}
	<div class="hidden">
		<div bind:this={panel} use:mount>
			<slot />
		</div>
	</div>
	{/if}
</li>



