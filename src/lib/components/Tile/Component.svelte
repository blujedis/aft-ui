<script lang="ts">
	import { type TileProps, tileDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = TileProps & ElementProps<'div'>;

	export let { full, rounded, shadowed, size, theme, variant } = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: inputClasses = th
		.create('Tile')
		.variant('tile', variant, theme, variant)
		.option('fieldFontSizes', size, size)
		.option('boxPadding', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.append('w-full h-full', full)
		.append('inline-flex flex-col items-center justify-center font-semibold', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<div {...$$restProps} use:forwardedEvents class={inputClasses}>
	<slot />
</div>
