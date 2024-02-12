<script lang="ts">
	import { get_current_component } from 'svelte/internal';
	import { themer, themeStore } from '$lib/theme';
	import { forwardEventsBuilder, boolToMapValue } from '$lib/utils';
	import type { ElementProps } from '$lib/types';
	import { lazyImage } from '$lib/utils/lazyImage';
	import { type ImageProps, imageDefaults as defaults } from './module';
	type $$Props = ImageProps & ElementProps<'img'>;

	export let { alt, fit, full, lazyload, position, rounded, shadowed, src } = {
		...defaults
	} as Required<ImageProps>;

	const lazyloader = lazyload ? lazyImage(lazyload === true ? {} : lazyload) : () => {};

	$: inputClasses = themer($themeStore)
		.create('Image')
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('objectFit', position ? 'none' : fit, fit) // if position fit must be none.
		.option('objectPosition', position, position)
		.append('w-full h-full', full === true)
		.append('w-full', ['w', 'width'].includes(full as string))
		.append('h-full', ['h', 'height'].includes(full as string))
		.append($$restProps.class, true)
		.compile();

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if lazyload}
	<img {...$$restProps} use:forwardedEvents use:lazyloader={src} {alt} class={inputClasses} />
{:else}
	<img {...$$restProps} use:forwardedEvents {src} {alt} class={inputClasses} />
{/if}
