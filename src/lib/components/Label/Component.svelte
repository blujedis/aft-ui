<script lang="ts">
	import { type LabelProps, labelDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { boolToMapValue, forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = LabelProps & Omit<ElementProps<'label'>, 'size'>;

	export let { dropshadowed, inline, full, reversed, rounded, size, theme, visible } = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: labelClasses = th
		.create('Label')
		.bundle(['mainText'], theme, true)
		.option('fieldFontSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('dropshadows', boolToMapValue(dropshadowed), dropshadowed)
		.prepend(`label-${theme}`, theme)
		.prepend(`label`, true)
		.append('w-full', full)
		.append('flex items-center space-x-2', inline)
		.append('space-x-reverse flex-row-reverse', inline && reversed)
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
