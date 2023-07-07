<script lang="ts">
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import { themer, themeStore } from '$lib/theme';
	import { type ButtonProps, buttonDefaults as defaults } from './module';
	import type { ElementNativeProps } from '../types';

	type Tag = $$Generic<'button' | 'a'>;
	type $$Props = ButtonProps<Tag> & ElementNativeProps<Tag>;

	export let {
		as,
		disabled,
		focused,
		full,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant,
		underlined,
		unstyled
	} = { ...defaults, ...$themeStore.defaults.component } as Required<ButtonProps<Tag>>;

	const th = themer($themeStore);

	$: buttonClasses = unstyled
		? th
				.create('Button')
				.option(focused === 'default' ? 'focusedSizes' : 'focusedVisibleSizes', size, focused)
				.option(focused === 'default' ? 'focused' : 'focusedVisible', theme, focused)
				.option('common', 'transition', transitioned)
				.option('fieldFontSizes', size, size)
				.option('buttonPadding', size, size && variant !== 'text')
				.option('roundeds', rounded, rounded)
				.option('shadows', shadowed, shadowed && variant !== 'text')
				.option('dropshadows', shadowed, shadowed && variant === 'text')
				.option('disableds', theme, disabled)
				.append('underline', underlined)
				.append('w-full', full)
				.append($$restProps.class, true)
				.compile(true)
		: th
				.create('Button')
				.variant('button', variant, theme, true)
				.option(focused === 'default' ? 'focusedSizes' : 'focusedVisibleSizes', size, focused)
				.option(focused === 'default' ? 'focused' : 'focusedVisible', theme, focused)
				.option('common', 'transition', transitioned)
				.option('fieldFontSizes', size, size)
				.option('buttonPadding', size, size && variant !== 'text')
				.option('roundeds', rounded, rounded)
				.option('shadows', shadowed, shadowed && variant !== 'text')
				.option('dropshadows', shadowed, shadowed && variant === 'text')
				.option('disableds', theme, disabled)
				.append('underline', underlined)
				.append('w-full', full)
				.append('inline-flex items-center justify-center transition-all', true)
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
	<slot />
</svelte:element>
