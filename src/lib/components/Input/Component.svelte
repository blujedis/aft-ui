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
		variant
	} = {
		...defaults
		//...$themeStore.defaults?.component
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: inputClasses = th
		.create('Input')
		.bundle(['mainBg', 'whiteText', 'filledPlaceholder'], theme, variant === 'filled')
		.bundle(
			['inputText', 'mainRing'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(
			['mainBorder', 'mainBorderGroupHover', 'softBg', 'inputText'],
			theme,
			variant === 'soft'
		)
		.bundle(['mainBorder', 'mainBorderGroupHover', 'inputText'], theme, variant === 'flushed')
		.option('common', 'focusedOutline', focused && variant === 'outlined')
		.option('outlineFocus', theme, focused && variant === 'outlined')
		.bundle(['inputText'], theme, variant === 'text')
		.option('common', 'transitioned', transitioned)
		.option('hovered', variant, theme, hovered)
		.option('fieldFontSizes', size, size)
		.option('fieldPadding', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded && variant !== 'flushed')
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('common', 'disabled', disabled)
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
		<input {...$$restProps} use:forwardedEvents size={chars} class={inputClasses} />
	</svelte:component>
{:else}
	<input {...$$restProps} use:forwardedEvents size={chars} class={inputClasses} />
{/if}
