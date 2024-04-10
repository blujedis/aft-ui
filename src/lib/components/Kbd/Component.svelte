<script lang="ts">
	import { type KbdProps, kbdDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder, boolToMapValue, cleanObj } from '$lib/utils';
	import type { ElementProps } from '$lib/types';

	type $$Props = KbdProps & Omit<ElementProps<'kbd'>, 'size'>;

	export let { full, hovered, rounded, shadowed, size, theme, transitioned, variant } = {
		...cleanObj($themeStore.defaults?.component, ['focused']),
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: kbdClasses = th
		.create('Kbd')
		.bundle(['mainBg', 'filledText'], theme, variant === 'filled')
		.bundle(
			['mainRing', 'unfilledText'],
			{ $base: 'ring-1 ring-inset' },
			theme,
			variant === 'outlined'
		)
		.bundle(['softBg', 'unfilledText'], theme, variant === 'soft')
		.option('common', 'transitioned', transitioned)
		.option('hovered', variant, theme, hovered)
		.option('kbdPadding', size, size)
		.option('badgeFontSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.prepend(`kbd kbd-${variant} kbd-${theme}`, true)
		.append('w-full', full)
		.append('relative inline-flex items-center justify-center align-text-bottom', true)
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<kbd use:forwardedEvents {...$$restProps} class={kbdClasses}>
	<span class="pt-px">
		<slot />
	</span>
</kbd>
