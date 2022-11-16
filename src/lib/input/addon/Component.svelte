<script lang="ts">
	import { Builder, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../../init';
	import { setContext } from 'svelte';

	type ElementProps = PickElement<'div', 'size'>;
	type Defaults = typeof defaults;

	interface $$Props extends ElementProps, Defaults {}

	const { palette, components } = $themeStore;
	const addon = normalize(components.inputAddon.main, palette);
	const b = new Builder(addon, palette);

	const defaults = b.defaults(
		{
			base: true,
			size: 'md'
		},
		['variant']
	);

	export let base = defaults.base;
	export let theme = defaults.theme;
	export let size = defaults.size;
	export let full = defaults.full;

	const left = $$slots.left;
	const right = $$slots.right;

	setContext('AddOn', {
		theme,
		size,
		left,
		right
	});

	let leftClass = '';
	let rightClass = '';

	if (left) {
		const bl = new Builder(components.inputAddon.icon);
		leftClass = bl
			.addFeature('base', base)
			.addHandlerClass('size', left, 'left', size as unknown as any)
			.addVariant('default', theme)
			.bundle();
	}

	if (right) {
		const br = new Builder(components.inputAddon.icon);
		rightClass = br
			.addFeature('base', base)
			.addHandlerClass('size', right, 'right', size as unknown as any)
			.addVariant('default', theme)
			.bundle();
	}

	const classes = b
		.addFeature('base', base)
		.addFeature('full', full)
		.addUserClass($$restProps.class)
		.bundle();
</script>

<div {...$$restProps} class={classes}>
	{#if left}
		<span class={leftClass}>
			<slot name="left" />
		</span>
	{/if}
	<slot />
	{#if right}
		<span class={rightClass}>
			<slot name="right" />
		</span>
	{/if}
</div>
