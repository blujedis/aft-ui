<script lang="ts">
	import { Builder, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';

	type ElementProps = PickElement<'span', 'size'>;
	type Defaults = typeof defaults;
	interface $$Props extends ElementProps, Defaults {}

	const { palette, components } = $themeStore;
	const badge = normalize(components.badge.main, palette);
	const b = new Builder(badge, palette);

	const defaults = b.defaults(
		{
			base: true,
			weight: 'normal',
			size: 'sm',
			hovered: false
		},
		['variant']
	);

	export let base = defaults.base;
	export let rounded = defaults.rounded;
	export let shadow = defaults.shadow;
	export let size = defaults.size;
	export let theme = defaults.theme;
	export let hovered = defaults.hovered;
	export let transform = defaults.transform;
	export let weight = defaults.weight;

	const classes = b
		.addFeature('base', base)
		.addFeature('size', size)
		.addFeature('rounded', rounded)
		.addFeature('shadow', shadow)
		.addFeature('weight', weight)
		.addFeature('transform', transform)
		.addVariant('default', theme)
		.addHandlerClass('hovered', hovered, theme)
		.addUserClass($$restProps.class)
		.bundle();
</script>

<span {...$$restProps} class={classes} on:click>
	<slot />
</span>
