<script lang="ts">
	import { Builder, classnames, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';

	type ElementProps = PickElement<'span', 'size'>;
	type Defaults = typeof defaults;
	interface $$Props extends ElementProps, Defaults {}

	const { palette, components } = $themeStore;
	const icon = normalize(components.icon.main, palette);
	const b = new Builder(icon, palette);

	const defaults = b.defaults({
		base: true,
		transition: true,
		size: 'md'
	});

	export let base = defaults.base;
	export let rounded = defaults.rounded;
	export let shadow = defaults.shadow;
	export let size = defaults.size;
	export let variant = defaults.variant;
	export let theme = defaults.theme;
	export let hovered = defaults.hovered;
	export let transition = defaults.transition;
	export let animate = defaults.animate;

	const inner = classnames(
		b.getFeature('size')[size as keyof typeof components.icon.main.size],
		'block'
	);

	const classes = b
		.addFeature('base', base)
		.addFeature('transition', transition)
		.addFeature('rounded', rounded)
		.addFeature('shadow', shadow)
		.addFeature('animate', animate)
		.addHandlerClass('hovered', hovered, variant, theme)
		.addVariant(variant || 'default', theme)
		.addUserClass($$restProps.class)
		.bundle();
</script>

<!-- Wrapped in outer span so that padding does not 
     cause inner icon to be scaled down.default
-->
<span {...$$restProps} class={classes}>
	<span class={inner}>
		<slot />
	</span>
</span>
