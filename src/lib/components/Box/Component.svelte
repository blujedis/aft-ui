<script lang="ts">
	import { type BoxProps, boxDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue, cleanObj } from '$lib/utils';
	import type { ElementProps, ThemeColor, BlockTag } from '$lib/types';

	type Tag = $$Generic<BlockTag>;
	type $$Props = BoxProps<Tag> & ElementProps<Tag>;

	export let {
		as,
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
		skeletoned,
		theme,
		transitioned,
		variant
	} = {
		...cleanObj($themeStore.defaults?.component),
		...defaults
	} as Required<BoxProps<Tag>>;

	const th = themer($themeStore);

	$: boxClasses = th
		.create('Box')
		.bundle(['mainBg', 'filledText'], theme, variant === 'filled')
		.bundle(
			['mainRing', 'unfilledText'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['softBg', 'unfilledText'], theme, variant === 'soft')
		.option('mainBorder', theme, bordered || emptied)
		.option('hovered', variant, theme as ThemeColor, hovered)
		.option('common', 'focusedOutlineWithin', focused)
		.option('outlineFocusWithin', theme, focused)
		.option('common', 'transitioned', transitioned)
		.option('fieldFontSizes', size, size)
		.option('boxPadding', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('dropshadows', boolToMapValue(dropshadowed), dropshadowed)
		.prepend(`box box-${variant}`, true)
		.append('border', bordered)
		.append('cursor-pointer', href)
		.append('w-full h-full', full)
		.append('border-[3px] border-dashed', emptied)
		.append('inline-flex relative', true)
		.append('items-center justify-center', centered)
		.append('animate-pulse bg-frame-300/20 dark:bg-frame-900/70', skeletoned)
		.append($$restProps.class, true)
		.compile();

	if (href) $$restProps.href = href;

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:element
	this={as}
	role="presentation"
	{...$$restProps}
	use:forwardedEvents
	on:click
	on:drop
	on:dragover
	on:dragleave
	on:dragend
	class={boxClasses}
>
	<slot />
</svelte:element>
