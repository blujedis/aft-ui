<script lang="ts">
	import { Builder, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '$lib';

	type ElementProps = PickElement<'span', 'size' | 'as'>;
	type Defaults = typeof defaults;
	type $$Props = ElementProps & Defaults;

	const { palette, components } = $themeStore;
	const text = normalize(components.text.main, palette);
	const b = new Builder(text, palette);

	const defaults = b.defaults(
		{
			base: true,
			size: 'sm',
			as: 'span'
		},
		['variant']
	);

	export let base = defaults.base;
	export let size = defaults.size;
	export let theme = defaults.theme;
	export let transform = defaults.transform;
	export let weight = defaults.weight;
	export let dropshadow = defaults.dropshadow;
	export let as = defaults.as;

	const classes = b
		.addFeature('base', base)
		.addFeature('size', size)
		.addFeature('dropshadow', dropshadow)
		.addFeature('weight', weight)
		.addFeature('transform', transform)
		.addVariant('default', theme)
		.addUserClass($$restProps.class)
		.bundle();
</script>

<svelte:element this={as} { ...$$restProps} class={classes}>
	<slot />
</svelte:element>