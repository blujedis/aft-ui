<script lang="ts">
	import { type MultiselectOptionProps, multiselectOptionDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementProps } from '../../types';
	import { forwardEventsBuilder } from '$lib/utils';
	import { get_current_component } from 'svelte/internal';
	import type { MultiselectControllerContext } from '../MultiselectController';
	import { getContext } from 'svelte';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = MultiselectOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('MultiselectContext') as MultiselectControllerContext;

	export let { as, multiple, selected, size, theme, value, variant } = {
		...defaults,
		...context?.globals
	} as Required<MultiselectOptionProps<Tag>>;

	const th = themer($themeStore);

	$: optionClasses = th
		.create('DropdownOption')
		.variant('dropdownOption', variant, theme, variant)
		.option('focused', theme, true)
		.option('focusedRingSizes', 'two', true)
		.remove('focus-visible:', true)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.append('inline-flex items-center justify-between text-left', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());

	function handleClick(e: Event & { currentTarget: HTMLElement }) {
		e.stopPropagation();
		e.preventDefault();
		if (multiple) {
			if (context.isSelected(value)) context.unselect(value);
			else context.select(value);
		} else {
			context.select(value);
			setTimeout(() => context.close()); // helps flicker.
		}
		setTimeout(() => {
			console.log($context.selected);
		}, 200);
	}
</script>

{#if as === 'button'}
	<button
		role="option"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		aria-selected={selected}
		data-key={value}
		class={optionClasses}
	>
		<slot />
	</button>
{:else}
	<a
		role="menuitem"
		tabindex="-1"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		class={optionClasses}
		href={$$restProps.href}
		data-key={value}
	>
		<slot />
	</a>
{/if}
