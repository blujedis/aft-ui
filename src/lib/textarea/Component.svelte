<script lang="ts">
	import { Builder, normalize, stylenames, uniqid } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';

	type ElementProps = PickElement<'textarea', 'size'>;
	type Defaults = typeof defaults;
	interface $$Props extends ElementProps, Defaults {}

	const { palette, components, config } = $themeStore;
	const textarea = normalize(components.textarea.main, palette);
	const b = new Builder(textarea, palette);

	const defaults = b.defaults(
		{
			base: true,
			variant: 'filled',
			size: 'md',
			hovered: true,
			resize: 'both'
		},
		['roundedAdjust']
	);

	export let id = uniqid() as string | null | undefined;
	export let value = '';
	export let base = defaults.base;
	export let rounded = defaults.rounded;
	export let shadow = defaults.shadow;
	export let ringed = defaults.ringed;
	export let size = defaults.size;
	export let full = defaults.full;
	export let variant = defaults.variant || 'filled';
	export let theme = defaults.theme;
	export let hovered = defaults.hovered;
	export let resize = defaults.resize;
	export let active = defaults.active;

	ringed = typeof ringed !== 'boolean' && variant === 'outline' ? true : ringed;

	const classes = b
		.addFeature('base', base)
		.addFeature('rounded', rounded)
		.addFeature('shadow', shadow)
		.addFeature('ringed', ringed)
		.addFeature('size', size)
		.addFeature('full', full)
		.addFeature('active', active)
		.addHandlerClass('roundedAdjust', !!rounded, rounded as any, size as any)
		.addVariant(variant, theme)
		.addHandlerClass('hovered', hovered, variant, theme)
		.addUserClass(config.common.disabled, !!$$restProps.disabled)
		.addUserClass($$restProps.class)
		.bundle();
</script>

<textarea
	{...$$restProps}
	{id}
	style={stylenames(`resize:${resize}`)}
	class={classes}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseenter
	on:mouseleave
	on:mouseover
	on:paste
	on:resize
/>
