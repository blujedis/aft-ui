<script lang="ts">
	import { type CardProps, cardDefaults as defaults, type CardContext } from './module';
	import themeStore, { themer } from '$lib';
	import type { ElementNativeProps } from '../../types';
	import { onMount, setContext } from 'svelte';
	import { cleanObj } from '$lib/utils';

	type $$Props = CardProps & ElementNativeProps<'div'>;

	export let { rounded, shadowed, size, theme, variant, wide } = {
		...defaults
	} as Required<CardProps>;

	const globals = cleanObj({
		size,
		theme,
		wide
	});

	setContext('Card', { globals } as CardContext);

	const th = themer($themeStore);
	let mounted = false;

	$: cardClasses = th
		.create('Card')
		.variant('card', variant, theme, true)
		.option('roundeds', rounded, rounded)
		.option('shadows', shadowed, shadowed)
		.append('h-full', true)
		.append($$restProps.class, true)
		.compile(true);
	onMount(() => {
		mounted = true;
	});
</script>

<div {...$$restProps} class={cardClasses} class:visible={mounted}>
	<slot />
</div>
