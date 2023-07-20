<script lang="ts">
	import { type MenuOptionProps, menuOptionDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementProps } from '../../types';
	import { forwardEventsBuilder } from '$lib/utils';
	import { get_current_component } from 'svelte/internal';
	import type { MenuControllerContext } from '../MenuController';
	import { getContext } from 'svelte';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = MenuOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('MenuController') as MenuControllerContext;

	export let { active, as, key, size, theme, variant } = {
		...defaults,
		...context?.globals
	} as Required<MenuOptionProps<Tag>>;

	const th = themer($themeStore);

	$: optionClasses = th
		.create('MenuOption')
		.variant('menuOption', variant, theme, variant)
		.option('focused', theme, true)
		.option('focusedRingSizes', 'two', true)
		.remove('focus-visible:', true)
		.option('fieldFontSizes', size, size)
		.append('block w-full', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function handleClick(e: Event & { currentTarget: HTMLElement }) {
		setTimeout(() => context.close());
	}
</script>

{#if as === 'button'}
	<button
		role="menuitem"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		aria-current={active}
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
		aria-current={active}
		class={optionClasses}
		href={$$restProps.href}
		data-key={key}
	>
		<slot />
	</a>
{/if}
