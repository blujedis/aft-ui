<script lang="ts">
	/**
	 * This is just a wrapper class because Iconify IconProps is missing
	 * the property class. You can see the documentation at
	 * @see https://docs.iconify.design/icon-components/svelte/dimensions.html#:~:text=%22cil%3Atruck%22-,class,-%3D%22big%2Dicon
	 */

	import { type IconProps, iconDefaults as defaults } from './module';
	import Icon from '@iconify/svelte';
	import { themer, themeStore } from '$lib/theme';
	import type { ThemeColor } from '$lib/types';
	type $$Props = IconProps;
	export let { hovered, icon, size, stroke, theme, transitioned } = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);
	$: _theme = (['white', 'black'].includes(theme) ? '' : theme) as ThemeColor;

	$: iconClasses = th
		.create('Icon')
		.option('iconSizes', size, size)
		.option('iconText', theme, theme && !stroke)
		.option('iconStroke', theme, theme && stroke)
		.option('hovered', 'filled', theme, hovered)
		.option('common', 'transitioned', transitioned)
		// .append('text-white', theme === 'white')
		// .append('text-black', theme === 'black')
		// .append('stroke-white', stroke && theme === 'white')
		// .append('stroke-black', stroke && theme === 'black')
		.append($$restProps.class, true)
		.compile();
</script>

<Icon {icon} class={iconClasses} aria-hidden={true} />
