<script lang="ts">
	import type { ElementNativeProps } from '../types';

	import { getContext } from 'svelte';
	import { themer, themeStore } from '$lib/theme';
	import { forwardEventsBuilder } from '$lib/utils';
	import { get_current_component } from 'svelte/internal';
	import type { DropdownContext } from '$lib/components/Dropdown/module';
	import { type DropdownOptionProps, dropdownOptionDefaults as defaults } from './module';

	type Tag = $$Generic<'a' | 'button'>;
	type $$Props = DropdownOptionProps<Tag> & ElementNativeProps<Tag>;

	const context = getContext<DropdownContext>('Dropdown');
	const contextGroup = getContext<string>('DropdownGroup');

	export let { element, focused, label, size, value, theme, variant } = {
		...defaults,
		...context?.globals,
		element: context?.mode === 'menu' ? 'a' : 'button'
	} as Required<DropdownOptionProps<Tag>>;

	const forwardedEvents = forwardEventsBuilder(get_current_component());
	const th = themer($themeStore);
	context.add(value, label, contextGroup);

	$: isSelected = $context.selected.includes(value);

	$: optionClasses = th
		.create('DropdownOption')
		.variant('dropdownOption', variant, theme, variant)
		.option('focusedVisible', theme, focused)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.append('inline-flex items-center justify-between text-left', true)
		.append($$restProps.class, true)
		.compile(true);

	function handleClick(e: Event & { currentTarget: HTMLElement }) {
		if (['multiselect', 'tags'].includes(context.mode)) {
			if (context.isSelected(value)) context.unselect(value);
			else context.select(value);
		} else {
			context.select(value);
			setTimeout(() => context.close(), 50); // makes icon flicker less.
		}
	}
</script>

{#if element === 'button'}
	<button
		role="option"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		aria-selected={isSelected}
		data-value={value}
		class={optionClasses}
	>
		<slot selected={isSelected} />
	</button>
{:else}
	<a
		role="menuitem"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		class={optionClasses}
		href={$$restProps.href}
	>
		<slot selected={isSelected} />
	</a>
{/if}
