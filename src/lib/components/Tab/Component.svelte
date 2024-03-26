<script lang="ts">
	import { get_current_component } from 'svelte/internal';
	import { Flushed } from '../Flushed';
	import { themer, themeStore } from '$lib/theme';
	import { type TabProps, tabDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';
	import { getContext } from 'svelte';
	import type { TabsContext } from '$lib/components/Tabs';
	import { boolToMapValue, forwardEventsBuilder } from '$lib/utils';
	import { ConditionalComponent } from '$lib/components';

	type Tag = $$Generic<'a' | 'button'>;
	type $$Props = TabProps<Tag> & ElementProps<Tag>;

	type Temp = ElementProps<'button'>;

	let t: Temp['id'];

	const context = getContext('Tabs') as TabsContext;

	export let {
		as,
		disabled,
		focused,
		full,
		hovered,
		id,
		rounded,
		selected,
		size,
		theme,
		label,
		transitioned,
		underlined,
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
		variant: context.globals?.variant
	} as Required<TabProps<Tag>>;

	let panel: HTMLDivElement | undefined;
	let initialized = false;
	let index = -1;

	const additionalProps = {
		disabled,
		'aria-disabled': disabled
	};

	const th = themer($themeStore);

	// .append('[&>:not(:first-child):not(:last-child)]:rounded-none', variant === 'outlined')

	$: tabClasses = th
		.create('TabClass')
		.bundle(
			['selectedBgAriaSelected', 'filledTextAriaSelected'],
			theme,
			['filled', 'pills'].includes(variant) && selected
		)
		.option('elementBg', theme, ['filled', 'pills'].includes(variant))
		.option( 'panelBgHover', theme, ['filled', 'pills'].includes(variant) && hovered && !selected)
		.option('common', 'focusedOutlineVisible', focused)
		.option('outlineFocusVisible', theme, focused)
		.option('common', 'transitioned', transitioned)
		.option('common', 'disabled', disabled)
		.option('buttonPadding', size, size)
		.option('fieldFontSizes', size, size)
		.option('fieldLeading', size, size)

		.option('roundeds', boolToMapValue(rounded), rounded)
		.prepend('tab', true)
		.prepend('tab-selected', selected)
		.append('w-full', full)
		// .append('whitespace-nowrap', variant === 'flushed')
		.append('group-first:pl-0', variant === 'text')
		.append('rounded-none group-first:rounded-l group-last:rounded-r', variant === 'filled')
		.append('inline-flex items-center justify-center outline-none h-full', true)
		.compile();

	function init(node: HTMLElement & { $select: () => any }) {
		let tabs = $context.tabs;
		if (!initialized) {
			node.$select = () => (selected = true);
			tabs = [...tabs, node];
			const currentIndex = selected ? tabs.indexOf(node) : $context.currentIndex;
			context.set({ ...$context, tabs, currentIndex });
			initialized = true;
		}
		index = tabs.indexOf(node);
	}

	function mount(node: HTMLElement) {
		context.set({ ...$context, selected: node, currentIndex: index });
		const destroy = context.subscribe((s) => {
			if (s.selected !== node) selected = false;
		});
		return { destroy };
	}

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<li role="presentation" class:w-full={full} class="flex group">
	<ConditionalComponent
		as={Flushed}
		condition={variant === 'flushed'}
		{selected}
		{theme}
		group={true}
		{hovered}
		{focused}
		class="-mb-px"
	>
		<svelte:element
			this={as}
			use:forwardedEvents
			use:init
			aria-controls={`tab-panel-${index}`}
			{...$$restProps}
			{...additionalProps}
			role="tab"
			tabindex="0"
			class={tabClasses}
			aria-current={selected}
			aria-selected={selected}
			on:click={() => (selected = true)}
		>
			<slot name="label">
				{label}
			</slot>
		</svelte:element>
	</ConditionalComponent>
	{#if selected}
		<div class="hidden">
			<div bind:this={panel} use:mount>
				<slot />
			</div>
		</div>
	{/if}
</li>
