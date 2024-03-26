<script lang="ts">
	import { type MenuOptionProps, menuOptionDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { forwardEventsBuilder, cleanObj } from '$lib/utils';
	import { get_current_component } from 'svelte/internal';
	import type { MenuContext } from '$lib/components/Menu';
	import { getContext } from 'svelte';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = MenuOptionProps<Tag> & ElementProps<Tag>;

	const context = getContext('Menu') as MenuContext;

	export let { active, as, focused, hovered, size, theme, transitioned } = {
		...defaults,
		...cleanObj(context?.globals)
	} as Required<MenuOptionProps<Tag>>;

	const th = themer($themeStore);

	$: optionClasses = th
		.create('MenuOption')
		.option('bgFocus', theme, focused)
		.bundle(
			['selectedBgAriaCurrentpage'],
			{ $base: 'aria-[current="page"]:text-white' },
			theme,
			theme
		)
		.option('panelBgHover', theme, hovered)
		.option('common', 'transitioned', transitioned)
		.option('fieldFontSizes', size, size)
		.option('menuPadding', size, size)
		.prepend('menu-option', true)
		.prepend('menu-option-active', active)
		.append('block w-full', true)
		.append('outline-none [[data-active="true"]]:bg-info-500', true)
		.append($$restProps.class, true)
		.compile();

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
		aria-current={active ? 'page' : undefined}
		class={optionClasses}
	>
		<slot />
	</button>
{:else}
	<a
		role="menuitem"
		tabindex="0"
		{...$$restProps}
		use:forwardedEvents
		on:click={handleClick}
		aria-current={active ? 'page' : undefined}
		class={optionClasses}
		href={$$restProps.href}
	>
		<slot />
	</a>
{/if}
