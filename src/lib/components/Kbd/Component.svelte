<script lang="ts">
	import { type KbdProps, kbdDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../types';

	type $$Props = KbdProps & Omit<ElementNativeProps<'kbd'>, 'size'>;

	export let { full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
		...defaults
	} as Required<$$Props>;

	$: kbdClasses = themer($themeStore)
		.create('Kbd')
		.variant('kbd', variant, theme, true)
		.option('common', 'transition', transitioned)
		.remove(transitioned === 'colors' ? 'transition-all' : 'transition-colors', transitioned)
		.option('badgePadding', size, size)
		.option('badgeFontSizes', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('w-full', full)
		.append('flex items-center justify-center', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<kbd use:forwardedEvents {...$$restProps} class={kbdClasses}>
	<slot />
</kbd>
