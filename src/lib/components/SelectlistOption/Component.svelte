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

	export let { as, size, theme, key, variant } = {
		...defaults,
		...context?.globals
	} as Required<MultiselectOptionProps<Tag>>;

	const th = themer($themeStore);

	$: optionClasses = th
		.create('MultiselectOption')
		.variant('multiselectOption', variant, theme, variant)
		.option('focused', theme, true)
		.option('focusedRingSizes', 'two', true)
		.remove('focus-visible:', true)
		.option('fieldFontSizes', size, size)
		.option('menuPadding', size, size)
		.append('block w-full', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());

	function handleClick(e: Event & { currentTarget: HTMLElement }) {
		if (context?.globals.multiple) {
			if (context.isSelected(key)) context.unselect(key);
			else context.select(key);
		} else {
			console.log('click with value:', key);
			context.select(key);
			setTimeout(() => context.close()); // helps flicker.
		}
	}
</script>

{#if as === 'button'}
	<button
		role="option"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		aria-selected={$context.selected.includes(key)}
		data-key={key}
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
		aria-current={$context.selected.includes(key)}
		class={optionClasses}
		href={$$restProps.href}
		data-key={key}
	>
		<slot />
	</a>
{/if}
