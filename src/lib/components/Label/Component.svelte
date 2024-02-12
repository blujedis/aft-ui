<script lang="ts">
	import { type LabelProps, labelDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { boolToMapValue, forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = LabelProps & Omit<ElementProps<'span'>, 'size'>;

	export let { dropshadowed, hovered, full, rounded, shadowed, size, theme, transitioned } = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: labelClasses = th
		.create('Label')
		.bundle(['mainText'], theme, true)
		.option('common', 'transitioned', transitioned)
		.option('fieldFontSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('dropshadows', boolToMapValue(shadowed), shadowed)
		.option('hovered', 'text', theme, hovered)
		.append('w-full', full)
		.append('flex items-center justify-center', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<label use:forwardedEvents {...$$restProps} class={labelClasses}>
	<slot />
</label>
