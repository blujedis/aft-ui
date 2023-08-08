<script lang="ts">
	import { type CardProps, cardDefaults as defaults, type CardContext } from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementNativeProps } from '../../types';
	import { setContext } from 'svelte';
	import { cleanObj } from '$lib/utils';

	type $$Props = CardProps & ElementNativeProps<'div'>;

	export let { divided, full, horizontal, maxwidth, rounded, shadowed, size, theme, variant } = {
		...defaults
	} as Required<CardProps>;

	const globals = cleanObj({
		horizontal,
		size,
		theme,
		variant
	});

	setContext('Card', { globals } as CardContext);

	const th = themer($themeStore);

	$: cardClasses = th
		.create('Card')
		.option('cardSizes', maxwidth, maxwidth)
		.option('divideds', theme, divided)
		.option('common', 'ringed', divided)
		.option('roundeds', rounded, rounded)
		.option('common', 'ringed', true)
		.option('shadows', shadowed, shadowed)
		.append(horizontal ? 'divide-x' : 'divide-y', divided)
		.append('h-full', full)
		.append(horizontal ? 'flex' : 'flex flex-col', true)
		.append('overflow-hidden', true)
		.append($$restProps.class, true)
		.compile(true);
</script>

<div {...$$restProps} class={cardClasses}>
	<slot />
</div>
