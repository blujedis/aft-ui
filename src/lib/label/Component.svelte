<script lang="ts">
	import { Builder, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '$lib';

	type ElementProps = PickElement<'label', 'size'>;
	type Defaults = typeof defaults;
	interface $$Props extends ElementProps, Defaults {}

	const { palette, components } = $themeStore;
	const label = normalize(components.label.main, palette);
	const b = new Builder(label, palette);

	const defaults = b.defaults(
		{
			base: true,
			size: 'sm'
		},
		['variant']
	);

	export let base = defaults.base;
	export let size = defaults.size;
	export let theme = defaults.theme;
	export let transform = defaults.transform;
	export let weight = defaults.weight;
	export let dropshadow = defaults.dropshadow;

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

<label {...$$restProps} class={classes}>
	<slot />
</label>
