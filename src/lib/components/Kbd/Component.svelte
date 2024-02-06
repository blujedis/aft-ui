<script lang="ts">
	import { type KbdProps, kbdDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue} from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = KbdProps & Omit<ElementProps<'kbd'>, 'size'>;

	export let { full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
		...defaults
	} as Required<$$Props>;

	$: kbdClasses = themer($themeStore)
		.create('Kbd')
		.variant('kbd', variant, theme, variant)
		.option('common', 'transitioned', transitioned)
		.option('kbdPadding', size, size)
		.option('badgeFontSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.append('w-full', full)
		.append('inline-flex items-center justify-center flex-col', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<kbd use:forwardedEvents {...$$restProps} class={kbdClasses}>
	<slot />
</kbd>
