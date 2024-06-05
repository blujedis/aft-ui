<script lang="ts">
	import { type CardProps, cardDefaults as defaults, type CardContext } from './module';
	import { themer, themeStore } from '$lib/theme';
	import type { ElementProps } from '$lib/types';
	import { setContext } from 'svelte';
	import { cleanObj, boolToMapValue } from '$lib/utils';

	type $$Props = CardProps & ElementProps<'div'>;

	export let {
		divided,
		dropshadowed,
		full,
		horizontal,
		href,
		maxwidth,
		rounded,
		shadowed,
		size,
		theme,
		variant
	} = {
		...cleanObj($themeStore.defaults?.component),
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
		.option('elementRing', theme, divided || variant === 'outlined')
		.option('cardSizes', maxwidth, maxwidth)
		.option('elementDivide', theme, divided)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.option('dropshadows', boolToMapValue(dropshadowed), dropshadowed)
		.prepend(`card`, true)
		.prepend(`card-${variant}`, variant)
		.append(horizontal ? 'divide-x' : 'divide-y', divided || variant === 'outlined')
		.append('h-full', full)
		.append('cursor-pointer', href)
		.append(horizontal ? 'flex' : 'flex flex-col', true)
		.append('overflow-hidden', true)
		.append('ring-1', variant === 'outlined')
		.append($$restProps.class, true)
		.compile();

	if (href) $$restProps.href = href;
</script>

<svelte:element this={href ? 'a' : 'div'} {...$$restProps} class={cardClasses}>
	<slot />
</svelte:element>
