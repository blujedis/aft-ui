<script lang="ts">
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '../../utils';
	import themeStore, { themer } from '../../';
	import { type ButtonProps, buttonDefaults as defaults } from './module';
	import type { ElementNativeProps } from '../../types';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = ButtonProps<Tag> & ElementNativeProps<Tag>;

	export let {
		as,
		disabled,
		focused,
		full,
		strategy,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant,
		underlined,
		unstyled
	} = { ...defaults } as Required<ButtonProps<Tag>>;

	const th = themer($themeStore);

	$: buttonClasses = unstyled
		? th
				.create('Button')
				.option('focused', theme, focused)
				.option('focusedRingSizes', 'two', focused)
				.remove(focused === 'visible' || focused === true ? 'focus:' : 'focus-visible:', true)
				.option('common', 'transition', transitioned)
				.option('fieldFontSizes', size, size)
				.option('buttonPadding', size, size && variant !== 'text')
				.option('roundeds', rounded, rounded)
				.option('shadows', shadowed, shadowed && variant !== 'text')
				.option('dropshadows', shadowed, shadowed && variant === 'text')
				.option('disableds', theme, disabled)
				.append('font-medium', strategy === 'button')
				.append('underline', underlined)
				.append('w-full', full)
				.append('inline-flex items-center justify-center outline-none', true)
				.append($$restProps.class, true)
				.compile(true)
		: th
				.create('Button')
				.variant('button', variant, theme, true)
				.option('focused', theme, focused)
				.option('focusedRingSizes', 'two', focused)
				.remove(focused === 'visible' ? 'focus:' : 'focus-visible:', true)
				.option('common', 'transition', transitioned)
				.option('fieldFontSizes', size, size)
				.option('buttonPadding', size, size && variant !== 'text')
				.option('roundeds', rounded, rounded)
				.option('shadows', shadowed, shadowed && variant !== 'text')
				.option('dropshadows', shadowed, shadowed && variant === 'text')
				.option('disableds', theme, disabled)
				.append('font-medium uppercase text-xs', strategy === 'button')
				.append('underline', underlined)
				.append('w-full', full)
				.append('inline-flex items-center justify-center outline-none', true)
				.append($$restProps.class, true)
				.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:element
	this={typeof as === 'undefined' ? 'button' : 'a'}
	use:forwardedEvents
	{...$$restProps}
	class={buttonClasses}
	{disabled}
	aria-disabled={disabled}
>
	{#if strategy === 'button'}
		<div class="pt-0.5">
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
</svelte:element>
