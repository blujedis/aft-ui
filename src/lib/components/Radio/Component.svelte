<script lang="ts">
	import { type RadioProps, radioDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../types';

	type $$Props = RadioProps & Omit<ElementNativeProps<'input'>, 'size'>;

	export let {
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

	$: checkboxClasses = themer($themeStore)
		.create('Radio')
		.variant('radio', variant, theme, true)
		.option(focused === 'default' ? 'focusedSizes' : 'focusedVisibleSizes', size, focused)
		.option(focused === 'default' ? 'focused' : 'focusedVisible', theme, focused)
		.option('common', 'transition', transitioned)
		.remove(transitioned === 'colors' ? 'transition-all' : 'transition-colors', transitioned)
		.option('iconSizes', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('disableds', theme, disabled)
		.append('w-full', full)
		.append('flex items-center justify-center form-radio', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<input {...$$restProps} type="radio" use:forwardedEvents class={checkboxClasses} />
