<script lang="ts">
	import { Builder, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';

	type ElementProps = PickElement<'input', 'size'>;
	type Defaults = typeof defaults;
	interface $$Props extends ElementProps, Defaults {}

	const { palette, components, config } = $themeStore;
	const radio = normalize(components.radio.main, palette);
	const b = new Builder(radio, palette);

	const defaults = b.defaults(
		{
			base: true,
			size: 'md',
			transition: true,
			hovered: true
		},
		['variant']
	);

	export let value = '';
	export let base = defaults.base;
	export let group = undefined as any;
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
		.addFeature('size', size)
		.addFeature('transition', transition)
		.addFeature('active', active)
		.addHandlerClass('hovered', hovered, theme)
		.addUserClass(config.common.disabled, !!$$restProps.disabled)
		.addUserClass($$restProps.class)
		.addVariant('default', theme)
		.bundle();
</script>

<input {...$$restProps} type="radio" {value} class={classes} bind:group on:change />
