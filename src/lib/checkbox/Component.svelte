<script lang="ts">
	import { Builder, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';

	type ElementProps = PickElement<'input', 'size'>;
	type Defaults = typeof defaults;

	interface $$Props extends ElementProps, Defaults {
		checked?: boolean;
		group?: any;
	}

	const { palette, config, components } = $themeStore;
	const checkbox = normalize(components.checkbox.main, palette);
	const b = new Builder(checkbox, palette);

	const defaults = b.defaults(
		{
			base: true,
			size: 'md',
			transition: true,
			hovered: true
		},
		['variant']
	);

	export let checked = false;
	export let value = '';
	export let base = defaults.base;
	export let rounded = defaults.rounded;
	export let shadow = defaults.shadow;
	export let ringed = defaults.ringed;
	export let size = defaults.size;
	export let theme = defaults.theme;
	export let hovered = defaults.hovered;
	export let transition = defaults.transition;
	export let active = defaults.active;

	const classes = b
		.addFeature('base', base)
		.addFeature('ringed', ringed)
		.addFeature('shadow', shadow)
		.addFeature('rounded', rounded)
		.addFeature('active', active)
		.addFeature('size', size)
		.addFeature('transition', transition)
		.addHandlerClass('hovered', hovered, theme)
		.addUserClass(config.common.disabled, !!$$restProps.disabled)
		.addUserClass($$restProps.class)
		.addVariant('default', theme)
		.bundle();
</script>

<input {...$$restProps} type="checkbox" {value} class={classes} bind:checked on:change />
