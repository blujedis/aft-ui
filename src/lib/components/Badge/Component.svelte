<script lang="ts">
	import { type BadgeProps, badgeDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { boolToMapValue } from '$lib/utils';

	type $$Props = BadgeProps & Omit<ElementProps<'span'>, 'size'>;

	export let {
		focused,
		full,
		hovered,
		removable,
		rounded,
		shadowed,
		size,
		theme,
		transitioned,
		variant
	} = {
		...defaults
	} as Required<BadgeProps>;

	const th = themer($themeStore);
	const additionalProps = focused ? { tabindex: 0 } : {};

	$: badgeClasses = th
		.create('Badge')
		.bundle(['mainBg', 'whiteText'], theme, variant === 'filled')
		.bundle(['mainText', 'mainRing'], { $base: 'ring-1 ring-inset' }, theme, variant === 'outlined')
		.bundle(['softBg', 'softText'], {}, theme, variant === 'soft')
		.option('common', 'transitioned', transitioned)
		.option('common', 'focusedOutlineVisible', focused)
		.option('outlineFocusVisible', theme, focused)
		.option('badgeFontSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.prepend('badge-removable', removable)
		.append('w-full', full)
		.append('z-20 badge', true)
		.append('relative inline-flex items-center leading-tight justify-center', !removable)
		.append($$restProps.class, true)
		.compile();

	$: badgeInnerClasses = th.create('BadgeInner').option('badgeInnerMargin', size, size).compile();
</script>

<span {...additionalProps} {...$$restProps} class={badgeClasses}>
	<!-- {#if !removable} -->
	<!-- <div class:mt-0.5={!['sm', 'xs', 'xl'].includes(size)}> -->
	<div class={badgeInnerClasses}>
		<slot />
	</div>
	<!-- {:else}
		<slot />
	{/if} -->
</span>
