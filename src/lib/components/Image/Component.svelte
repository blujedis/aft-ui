<script lang="ts">
	import { get_current_component } from 'svelte/internal';
	import themeStore, { themer } from '$lib';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps } from '../../types';
	import { type ImageProps, imageDefaults as defaults } from './module';
	type $$Props = ImageProps & ElementNativeProps<'img'>;

	export let { fit, full, position, rounded, shadowed } = {
		...defaults
	} as Required<ImageProps>;

	$: inputClasses = themer($themeStore)
		.create('Image')
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.option('objectFit', position ? 'none' : fit, fit) // if position fit must be none.
		.option('objectPosition', position, position)
		.append('w-full h-full', full === true)
		.append('w-full', ['w', 'width'].includes(full as string))
		.append('h-full', ['h', 'height'].includes(full as string))
		.append($$restProps.class, true)
		.compile(true);

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<img {...$$restProps} use:forwardedEvents class={inputClasses} alt={$$restProps.alt} />
