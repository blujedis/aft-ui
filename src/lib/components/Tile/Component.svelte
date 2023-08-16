<script lang="ts">
	import { type TileProps, tileDefaults as defaults } from './module';
	import { themer, themeStore } from '../../theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '../../types';
	import { onMount } from 'svelte';

	type $$Props = TileProps & ElementProps<'div'>;

	export let { full, rounded, shadowed, size, theme, variant } = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);

	$: inputClasses = th
		.create('Tile')
		.variant('globals', variant, theme, true)
		.option('fieldFontSizes', size, size)
		.option('boxPadding', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('w-full h-full', full)
		.append('inline-flex flex-col items-center justify-center font-semibold', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<div {...$$restProps} use:forwardedEvents class={inputClasses}>
	<slot />
</div>
