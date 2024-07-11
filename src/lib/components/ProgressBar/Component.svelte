<script lang="ts">
	import { tweened } from 'svelte/motion';

	import { type ProgressBarProps, progressBarDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue, cleanObj } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = ProgressBarProps & Omit<ElementProps<'progress'>, 'size'>;

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
		...cleanObj($themeStore.defaults?.component, ['transitioned', 'focused', 'hovered']),
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
		.bundle(['progressBgWebkitProgressValue', 'progressBgMozProgressBar'], theme, true)
		.option('progressBarSizes', size, size)
		.option('progressBarRoundedBar', boolToMapValue(rounded), rounded)
		.option('progressBarRoundedValue', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.prepend(`progress-bar progress-bar-${variant as string} progress-bar-${theme}`, true)
		.append('w-full', full)
		.append('appearance-none', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<progress use:forwardedEvents {...$$restProps} class={progressClasses} value={$store} {max}>
	<slot />
</progress>
