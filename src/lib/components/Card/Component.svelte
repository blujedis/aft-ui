<script lang="ts">
	import { type CardProps, cardDefaults as defaults, type CardContext } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { setContext } from 'svelte';
	import { cleanObj, boolToMapValue } from '$lib/utils';

	type $$Props = CardProps & ElementProps<'div'>;

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
		.option('common', 'divided', divided)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('common', 'ringed', divided || variant === 'outlined')
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.append(horizontal ? 'divide-x' : 'divide-y', divided || variant === 'outlined')
		.append('h-full', full)
		.append(horizontal ? 'flex' : 'flex flex-col', true)
		.append('overflow-hidden', true)
		.append($$restProps.class, true)
		.compile();
</script>

<div {...$$restProps} class={cardClasses}>
	<slot />
</div>
