<script lang="ts">
	import { tweened } from 'svelte/motion';

	import { type ProgressBarProps, progressBarDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../types';

	type $$Props = ProgressBarProps & Omit<ElementNativeProps<'progress'>, 'size'>;

	export let {
		animate,
		delay,
		duration,
		easing,
		full,
		interpolate,
		max,
		rounded,
		shadowed,
		size,
		theme,
		value,
		variant
	} = {
		...defaults
	} as Required<ProgressBarProps>;

	export const store = tweened(value, {
		delay,
		duration: !animate ? 0 : duration,
		easing,
		interpolate
	});

	$: progressClasses = themer($themeStore)
		.create('ProgressBar')
		.variant('progressBar', variant, theme, true)
		.option('progressBarSizes', size, size)
		.option('progressBarRoundedBar', rounded, rounded)
		.option('progressBarRoundedValue', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('w-full', full)
		.append('appearance-none', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<progress use:forwardedEvents {...$$restProps} class={progressClasses} value={$store} {max}>
	<slot />
</progress>
