<script lang="ts">
	import { type InputProps, inputDefaults as defaults } from './module';
	import { themeStore, themer } from '$lib';
	import { Flushed } from '../Flushed';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = InputProps & Omit<ElementProps<'input'>, 'size'>;

	export let {
		chars,
		disabled,
		focused,
		full,
		hovered,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		value,
		variant
	} = {
		...$themeStore.defaults?.component,
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: inputClasses = th
		.create('Input')
		.bundle(['mainBg', 'filledText', 'filledPlaceholder'], theme, variant === 'filled')
		.bundle(
			['mainRing', 'unfilledText'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['mainBorder', 'mainBorderGroupHover', 'softBg', 'softText'], theme, variant === 'soft')
		.bundle(['mainBorder', 'mainBorderGroupHover', 'unfilledText'], theme, variant === 'flushed')
		.option('common', 'focusedOutline', focused && variant !== 'flushed') // variant === 'outlined'
		.option('outlineFocus', theme, focused && variant !== 'flushed')
		.bundle(['unfilledText'], theme, variant === 'text')
		.option('common', 'transitioned', transitioned)
		.option('hovered', variant, theme, hovered)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded && variant !== 'flushed')
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
		.prepend(`input input-${variant} input-${theme}`, true)
		.append('w-full', full)
		.append('dark:bg-transparent', ['outlined', 'flushed', 'text'].includes(variant))
		.append('peer border-0', ['flushed'].includes(variant))
		.append('px-1', variant === 'flushed')
		.append('inline-flex items-center justify-center outline-none', true)
		.append($$restProps.class, true)
		.compile();
	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if variant === 'flushed'}
	<svelte:component this={Flushed} {theme} {focused}>
		<input
			{...$$restProps}
			use:forwardedEvents
			bind:value
			size={chars}
			class={inputClasses}
			on:input
		/>
	</svelte:component>
{:else}
	<input
		{...$$restProps}
		use:forwardedEvents
		bind:value
		size={chars}
		class={inputClasses}
		on:input
	/>
{/if}
