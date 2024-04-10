<script lang="ts">
	import { type DividerProps, dividerDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { boolToMapValue, cleanObj } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = DividerProps & Omit<ElementProps<'div'>, 'size'>;

	export let { orientation, dropshadowed, rounded, shadowed, size, theme, transitioned } = {
		...cleanObj($themeStore.defaults?.component),
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: dividerClasses = th
		.create('Divider')
		.option('dividerBg', theme, theme) // just overrides above for base frame color.
		.option('common', 'transitioned', transitioned)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('dropshadows', boolToMapValue(dropshadowed), dropshadowed)
		.option('dividerHorizontalMargin', size, size)
		.prepend('divider', true)
		.append('h-px ', orientation.startsWith('h'))
		.append('w-px', orientation.startsWith('v'))

		.append($$restProps.class, true)
		.compile();
</script>

<div {...$$restProps} class={dividerClasses}></div>

<style>
	/* .divider:after {
		content: '\200b';
	} */
</style>
