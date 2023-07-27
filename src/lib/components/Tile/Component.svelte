<script lang="ts">
	import { type TileProps, tileDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../../types';
	import { onMount } from 'svelte';

	type $$Props = TileProps & ElementNativeProps<'div'>;

	export let { full, rounded, shadowed, size, theme, variant } = {
		...defaults
	} as Required<$$Props>;

	const th = themer($themeStore);
	let mounted = false;

	$: inputClasses = th
		.create('Tile')
		.variant('tile', variant, theme, true)
		.option('fieldFontSizes', size, size)
		.option('boxPadding', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('w-full h-full', full)
		.append('inline-flex flex-col items-center justify-center', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
	onMount(() => {
		mounted = true;
	});
</script>

<div {...$$restProps} use:forwardedEvents class={inputClasses} class:invisible={!mounted}>
	<slot />
</div>
