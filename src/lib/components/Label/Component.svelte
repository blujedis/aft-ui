<script lang="ts">
	import { type LabelProps, labelDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { boolToMapValue, forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = LabelProps & Omit<ElementProps<'label'>, 'size'>;

	export let {
		dropshadowed,
		hovered,
		full,
		rounded,
		shadowed,
		reversed,
		size,
		theme,
		transitioned,
		visible
	} = {
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
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if visible}
	<label use:forwardedEvents {...$$restProps} class={labelClasses}>
		<slot />
	</label>
{:else}
	<slot />
{/if}
