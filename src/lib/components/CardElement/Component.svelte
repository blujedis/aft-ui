<script lang="ts">
	import { type CardElementProps, cardElementDefaults as defaults } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { getContext } from 'svelte';
	import type { CardContext } from '../Card/module';

	type $$Props = CardElementProps & ElementProps<'div'>;

	const context = getContext<CardContext>('Card');

	export let { horizontal, size, theme, type, variant } = {
		...defaults,
		...context.globals
	} as Required<CardElementProps>;

	const th = themer($themeStore);

	$: cardElementClasses = th
		.create('CardContent')
		.bundle(['mainBg', 'filledText'], theme, variant === 'filled')
		.bundle(['softBg'], theme, variant === 'soft')
		.bundle(['unfilledText'], theme, ['filled', 'soft'].includes(variant) && type === 'content')
		.option('cardPadding', size, size && type === 'content')
		.option('cardPaddingHeader', size, size && type === 'header')
		.option('cardPaddingFooter', size, size && type === 'footer')
		.option('cardFontSizes', size, size)
		.append('flex-1', type === 'content')
		.append($$restProps.class, true)
		.compile();
</script>

<div {...$$restProps} class={cardElementClasses}>
	<slot />
</div>
