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
	import { cleanObj } from '$lib/utils';
	type $$Props = IconProps;
	export let { hovered, icon, size, stroke, theme, transitioned } = {
		...cleanObj($themeStore.defaults?.component, ['focused', 'shadowed', 'rounded']),
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: iconClasses = th
		.create('Icon')
		.option('iconSizes', size, size)
		.option('iconText', theme, theme && !stroke)
		.option('iconStroke', theme, theme && stroke)
		.option('hovered', 'filled', theme, hovered)
		.option('common', 'transitioned', transitioned)
		.prepend(`icon icon-${theme}`, true)
		.append('inline-flex pointer-events-none', true)
		.append($$restProps.class, true)
		.compile();
</script>

<Icon {icon} class={iconClasses} aria-hidden={true} />
