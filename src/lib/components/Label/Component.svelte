<script lang="ts">
	import { type LabelProps, labelDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../../types';

	type $$Props = LabelProps & Omit<ElementNativeProps<'span'>, 'size'>;

	export let {
		dropshadowed,
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

	$: labelClasses = themer($themeStore)
		.create('Label')
		.variant('label', variant, theme, true)
		.option('common', 'transition', transitioned)
		.option('fieldFontSizes', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('dropshadows', shadowed, shadowed)
		.append('w-full', full)
		.append('flex items-center justify-center', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<label use:forwardedEvents {...$$restProps} class={labelClasses}>
	<slot />
</label>
