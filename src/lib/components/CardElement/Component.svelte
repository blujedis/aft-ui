<script lang="ts">
	import { type CardElementProps, cardElementDefaults as defaults } from './module';
	import { themeStore, themer } from '$lib';
	import type { ElementNativeProps } from '../../types';
	import { getContext } from 'svelte';
	import type { CardContext } from '../Card/module';

	type $$Props = CardElementProps & ElementNativeProps<'div'>;

	const context = getContext<CardContext>('Card');

	export let { horizontal, size, theme, type, variant } = {
		...defaults,
		...context?.globals
	} as Required<CardElementProps>;

	const th = themer($themeStore);

	$: cardElementClasses = th
		.create('CardContent')
		.variant('cardElement', variant, theme, variant)
		.option('cardPadding', size, size && type === 'content')
		.option('cardPaddingHeader', size, size && type === 'header')
		.option('cardPaddingFooter', size, size && type === 'footer')
		.option('cardFontSizes', size, size)
		.append('flex-1', type === 'content')
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {...$$restProps} class={cardElementClasses}>
	<slot />
</div>
