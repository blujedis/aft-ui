<script lang="ts">
	import { type Props, main } from './module';
	// import { Builder, normalize } from '@forewind/util';
	 import themeStore from '../init';
	//import type { PickElement } from '$lib/types';
	// type ElementProps = PickElement<'button', 'size'>;
	// type Defaults = typeof defaults;
	type $$Props = Props;

	// const { palette, components, config } = $themeStore;
	// const button = normalize(components.button.main, palette);
	// const b = new Builder(button, palette);

	// const defaults = b.defaults({
	// 	base: true,
	// 	size: 'md'
	// });

	const { config } = $themeStore;
	const button = main.clone();

	const defaults = button.defaults({
		base: true,
		size: 'md'
	});

	export let base = defaults.base;
	export let rounded = defaults.rounded;
	export let shadow = defaults.shadow;
	export let ringed = defaults.ringed;
	export let size = defaults.size;
	export let full = defaults.full;
	export let variant = defaults.variant || 'filled';
	export let theme = defaults.theme;
	export let hovered = defaults.hovered;
	export let transition = defaults.transition;
	export let transform = defaults.transform;
	export let weight = defaults.weight;
	export let active = defaults.active;

	const classes = button
		.addFeature('base', base)
		.addFeature('transition', transition)
		.addFeature('rounded', rounded)
		.addFeature('shadow', shadow)
		.addFeature('ringed', ringed)
		.addFeature('weight', weight)
		.addFeature('active', active)
		.addFeature('size', size)
		.addFeature('full', full)
		.addFeature('transform', transform)
		.addVariant(variant, theme)
		.addHandlerClass('hovered', hovered, variant, theme)
		.addUserClass(config.common.disabled, $$restProps.disabled === true)
		.addUserClass($$restProps.class)
		.bundle();
</script>

<button {...$$restProps} class={classes}>
	<slot />
</button>
