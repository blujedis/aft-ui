<script lang="ts">
	import { Builder, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';

	type ElementProps = PickElement<'kbd', 'size'>;
	type Defaults = typeof defaults;

	interface $$Props extends ElementProps, Defaults {
		checked?: boolean;
		group?: any;
	}

	const { palette, components } = $themeStore;
	const kbd = normalize(components.kbd.main, palette);
	const b = new Builder(kbd, palette);

	const defaults = b.defaults({
		base: true,
		size: 'md'
	});

	export let base = defaults.base;
	export let rounded = defaults.rounded;
	export let shadow = defaults.shadow;
	export let size = defaults.size;
	export let variant = defaults.variant || 'filled';
	export let theme = defaults.theme;

	const classes = b
		.addFeature('base', base)
		.addFeature('shadow', shadow)
		.addFeature('rounded', rounded)
		.addFeature('size', size)
		.addUserClass($$restProps.class)
		.addVariant(variant, theme)
		.bundle();
</script>

<kbd {...$$restProps} class={classes}>
	<slot />
</kbd>
