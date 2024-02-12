<script lang="ts">
	import { type TileProps, tileDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = TileProps & ElementProps<'div'>;

	export let { focused, full, hovered, rounded, shadowed, size, theme, transitioned, variant } = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: inputClasses = th
		.create('Tile')
		.bundle(['mainBg', 'whiteText'], theme, variant === 'filled')
		.bundle(['mainText', 'mainRing'], { $base: 'ring-1 ring-inset' }, theme, variant === 'outlined')
		.bundle(['softText', 'softBg'], theme, variant === 'soft')
		.option('hovered', variant, theme, hovered)
		.option('common', 'focusedOutlineVisible', focused)
		.option('outlineFocusVisible', theme, focused)
		.option('common', 'transitioned', transitioned)
		.option('fieldFontSizes', size, size)
		.option('boxPadding', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.append('w-full h-full', full)
		.append('inline-flex flex-col items-center justify-center font-semibold', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<div {...$$restProps} use:forwardedEvents class={inputClasses}>
	<slot />
</div>
