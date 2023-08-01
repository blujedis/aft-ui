<script lang="ts">
	import { type EmptyProps, emptyDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../../types';
	import { onMount } from 'svelte';

	type $$Props = EmptyProps & Omit<ElementNativeProps<'span'>, 'size'>;

	export let { as, full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
		...defaults
	} as Required<$$Props>;

	$: emptyClasses = themer($themeStore)
		.create('Empty')
		.variant('empty', variant, theme, true)
		.option('common', 'transition', transitioned)
		.option('emptySizes', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('w-full', full)
		.append('flex items-center justify-center', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:element this={as} use:forwardedEvents {...$$restProps} class={emptyClasses}>
	<slot />
</svelte:element>
