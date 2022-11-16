<script lang="ts">
	import { Builder, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';

	type ElementProps = PickElement<'input', 'size'>;
	type Defaults = typeof defaults;
	interface $$Props extends ElementProps, Defaults {
		checked?: boolean;
		text?: string;
	}

	const { palette, components, config } = $themeStore;
	const switcher = normalize(components.switcher.main, palette);
	const b = new Builder(switcher, palette);

	const defaults = b.defaults(
		{
			base: true,
			size: 'md'
		},
		['variant']
	);

	export let checked = false;
	export let text = '';
	export let base = defaults.base;
	export let shadow = defaults.shadow;
	export let ringed = defaults.ringed;
	export let size = defaults.size;
	export let theme = defaults.theme;
	export let transform = defaults.transform;
	export let weight = defaults.weight;
	export let active = defaults.active;
	export let position = defaults.position;

	const hasSlot = !!$$slots.default;
	const bw = new Builder(components.switcher.wrapper);
	const bt = new Builder(components.switcher.text);

	const wrapperClass = bw
		.addFeature('base', base)
		.addFeature('position', hasSlot && position)
		.bundle();

	const textClass = bt
		.addFeature('base', base)
		.addFeature('position', position)
		.addFeature('size', size)
		.addFeature('transform', transform)
		.addFeature('weight', weight)
		.bundle();

	const classes = b
		.addFeature('base', base)
		.addFeature('ringed', ringed)
		.addFeature('shadow', shadow)
		.addFeature('active', active)
		.addFeature('size', size)
		.addVariant('default', theme)
		.addUserClass(config.common.disabled, !!$$restProps.disabled)
		.bundle();
</script>

<label for={$$restProps.name} class={wrapperClass}>
	<input
		{...$$restProps}
		class="sr-only peer"
		type="checkbox"
		bind:checked
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
	<div class={classes} />
	<slot>
		{#if text}
			<span class={textClass}>{text}</span>
		{/if}
	</slot>
</label>

<style>
	.noflicker {
		backface-visibility: hidden;
		transform-style: preserve-3d;
		-webkit-tap-highlight-color: transparent;
	}
</style>
