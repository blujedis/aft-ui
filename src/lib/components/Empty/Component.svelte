<script lang="ts">
	import { type EmptyProps, emptyDefaults as defaults } from './module';
	import { themer, themeStore } from '../../theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps } from '../../types';

	type $$Props = EmptyProps & Omit<ElementProps<'span'>, 'size'>;

	export let { as, full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
		...defaults
	} as Required<$$Props>;

	$: emptyClasses = themer($themeStore)
		.create('Empty')
		.variant('empty', variant, theme, variant)
		.option('common', 'transitioned', transitioned)
		.option('emptySizes', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('w-full', full)
		.append('flex items-center justify-center border-[3px] border-dashed relative', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:element this={as} use:forwardedEvents {...$$restProps} class={emptyClasses}>
	<slot />
</svelte:element>
