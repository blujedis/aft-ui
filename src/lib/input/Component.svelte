<script lang="ts">
	import { Builder, normalize, uniqid, type Palette } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';
	import { getContext, onMount } from 'svelte';

	type ElementProps = PickElement<'input', 'size'>;

	type $$Props = ElementProps &
		typeof defaults & {
			ref?: (element: HTMLInputElement) => void;
		};

	const { palette, config, components } = $themeStore;
	const input = normalize(components.input.main, palette);
	const b = new Builder(input, palette);

	const defaults = b.defaults({
			base: true,
			size: 'md'
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
	export let transition = defaults.transition;
	export let transform = defaults.transform;
	export let weight = defaults.weight;
	export let addon = defaults.addon;
	export let active = defaults.active;
	export let ref: (element: HTMLInputElement) => void = (e) => {};

	let inputRef: HTMLInputElement;

	const addCtx = getContext('AddOn') as {
		theme: keyof Palette;
		size: keyof typeof input.size;
		left: boolean;
		right: boolean;
	};

	if (addCtx) {
		if (addCtx.left && addCtx.right) addon = 'both';
		else if (addCtx.left) addon = 'left';
		else if (addCtx.right) addon = 'right';
	}

	ringed = typeof ringed !== 'boolean' && variant === 'outline' ? true : ringed;
	full = addon ? true : full;
	size = typeof size === 'undefined' && addCtx?.size ? addCtx.size : size || 'md';
	theme = typeof theme === 'undefined' && addCtx?.theme ? addCtx.theme : theme;

	const classes = b
		.addFeature('base', base)
		.addFeature('rounded', rounded)
		.addFeature('shadow', shadow)
		.addFeature('ringed', ringed)
		.addFeature('size', size)
		.addFeature('transition', transition)
		.addFeature('active', active)
		.addFeature('full', full) // if addon always set to full.
		.addFeature('transform', transform)
		.addFeature('weight', weight)
		.addHandlerClass('roundedAdjust', !!rounded, rounded as any, size as any)
		.addHandlerClass('hovered', hovered, variant, theme)
		.addVariant(variant, theme)
		.addUserClass(config.common.disabled, !!$$restProps.disabled)
		.addUserClass($$restProps.class)
		.bundle();

	onMount(() => ref && ref(inputRef));

	
</script>

<input
	{...$$restProps}
	{id}
	bind:this={inputRef}
	bind:value
	class={classes}
	on:input
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
/>

<style>
	::file-selector-button,
	::-webkit-file-upload-button {
		display: none;
	}
</style>
