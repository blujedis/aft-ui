<script lang="ts">
	import { type TileProps, tileDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = TileProps & ElementProps<'div'>;

	export let {
		bordered,
		centered,
		dropshadowed,
		emptied,
		focused,
		full,
		href,
		hovered,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant
	} = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: tileClasses = th
		.create('Tile')
		.bundle(['mainBg', 'filledText'], theme, variant === 'filled')
		.bundle(
			['mainRing', 'unfilledText'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['softBg', 'unfilledText'], theme, variant === 'soft')
		.option('elementBorder', theme, bordered)
		.option('mainBorder', theme, emptied)
		.option('hovered', variant, theme, hovered)
		.option('common', 'focusedOutlineWithin', focused)
		.option('outlineFocusWithin', theme, focused)
		.option('common', 'transitioned', transitioned)
		.option('fieldFontSizes', size, size)
		.option('tilePadding', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('dropshadows', boolToMapValue(dropshadowed), dropshadowed)
		.prepend('tile', true)
		.append('border', bordered)
		.append('cursor-pointer', href)
		.append('w-full h-full', full)
		.append('border-[3px] border-dashed', emptied)
		.append('inline-flex relative', true)
		.append('items-center justify-center', centered)
		.append($$restProps.class, true)
		.compile();

	if (href) $$restProps.href = href;

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:element this={href ? 'a' : 'div'} {...$$restProps} use:forwardedEvents class={tileClasses}>
	<slot />
</svelte:element>
