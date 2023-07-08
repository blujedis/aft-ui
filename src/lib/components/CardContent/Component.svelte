<script lang="ts">
	import { type CardContentProps, cardContentDefaults as defaults } from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementNativeProps } from '../types';
	import { getContext } from 'svelte';
	import type { CardContext } from '../Card/module';

	type $$Props = CardContentProps & ElementNativeProps<'div'>;

	const context = getContext<CardContext>('Card');

	export let { mode, size, theme, variant, wide } = {
		...defaults,
		...context?.globals
	} as Required<CardContentProps>;

	const th = themer($themeStore);

	$: cardContentClasses = th
		.create('CardContent')
		.variant('cardContent', variant, theme, variant)
		.option('cardPadding', size, size && mode === 'content')
		.option('cardPaddingHeader', size, size && mode === 'header')
		.option('cardPaddingFooter', size, size && mode === 'footer')
		.append('px-0', wide)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {...$$restProps} class={cardContentClasses}>
	<slot />
</div>
