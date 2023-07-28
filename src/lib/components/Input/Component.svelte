<script lang="ts">
	import { type InputProps, inputDefaults as defaults } from './module';
	import themeStore, { Button, themer } from '$lib';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../../types';
	import getFocus from '$lib/theme/utils';

	type $$Props = InputProps & Omit<ElementNativeProps<'input'>, 'size'>;

	export let {
		chars,
		disabled,
		focused,
		full,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant,
		unstyled
	} = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: [focusMap, focusSize, focusOffset] = getFocus(
		focused,
		typeof focused === 'undefined' && variant === 'flushed'
			? ['borderFlush', 'focus', 'two', 'unstyled']
			: ['ring', 'focus', 'two', 'unstyled']
	);

	$: inputClasses = unstyled
		? th.create('Input').append($$restProps.class, true).compile(true)
		: th
				.create('Input')
				.variant('input', variant, theme, true)
				.mapped(focusMap, theme, focusMap)
				.append([focusSize, focusOffset], focusMap)
				.option('placeholders', theme, true)
				.option('common', 'transition', transitioned)
				.option('fieldFontSizes', size, size)
				.option('fieldPadding', size, size)
				.option('roundeds', rounded, rounded && variant !== 'flushed')
				.option('shadows', shadowed, shadowed)
				.option('disableds', theme, disabled)
				.append('w-full', full)
				.append('px-2', variant === 'flushed')
				.append('flex items-center justify-center focus:outline-none', true)
				.append($$restProps.class, true)
				.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<input {...$$restProps} use:forwardedEvents size={chars} class={inputClasses} />
