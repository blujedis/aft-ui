<script lang="ts">
	import { type PaginationDetailProps, paginationDetailDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../types';

	type $$Props = PaginationDetailProps & Omit<ElementNativeProps<'span'>, 'size'>;

	export let { full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
		...defaults
	} as Required<$$Props>;

	$: paginationDetailClasses = themer($themeStore)
		.create('PaginationDetail')
		.variant('paginationDetail', variant, theme, true)
		.option('common', 'transition', transitioned)
		.remove(transitioned === 'colors' ? 'transition-all' : 'transition-colors', transitioned)
		.option('badgePadding', size, size)
		.option('badgeFontSizes', size, size)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('w-full', full)
		.append('flex items-center justify-center', true)
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<div {...$$restProps} class={paginationDetailClasses}>
	<p class="text-sm text-gray-700">
		Showing
		<span class="font-medium">1</span>
		to
		<span class="font-medium">10</span>
		of
		<span class="font-medium">97</span>
		results
	</p>
</div>

<!-- <span use:forwardedEvents {...$$restProps} class={badgeClasses}>
	<slot />
</span> -->
