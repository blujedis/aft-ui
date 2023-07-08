<script lang="ts">
	import { type CardProps, cardDefaults as defaults, type CardContext } from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementNativeProps } from '../types';
	import { setContext } from 'svelte';

	type $$Props = CardProps & ElementNativeProps<'div'>;

	export let { edged, rounded, shadowed, size, theme, variant, wide } = {
		...defaults
	} as Required<CardProps>;

	setContext('Card', { globals: { size, theme, wide } } as CardContext);

	const th = themer($themeStore);

	$: cardClasses = th
		.create('Card')
		.variant('card', variant, theme, true)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('ring-1 ring-black ring-opacity-5', edged)
		.append('text-sm h-full', true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {...$$restProps} class={cardClasses}>
	<slot />
</div>
