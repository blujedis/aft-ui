<script lang="ts">
	import { Builder, normalize, uniqid } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';

	type ElementProps = PickElement<'select', 'size'>;
	type Defaults = typeof defaults;
	interface $$Props extends ElementProps, Defaults {
		items?: string[] | Record<string, { label: string; value: any }>[];
	}

	const { palette, components, config } = $themeStore;
	const select = normalize(components.select.main, palette);
	const b = new Builder(select, palette);

	const defaults = b.defaults(
		{
			base: true,
			variant: 'filled',
			size: 'md',
			hovered: true
		},
		['roundedAdjust']
	);

	export let id = uniqid() as string | null | undefined;
	export let value = '';
	export let items = [] as string[] | Record<string, { label: string; value: any }>[];
	export let base = defaults.base;
	export let rounded = defaults.rounded;
	export let shadow = defaults.shadow;
	export let ringed = defaults.ringed;
	export let size = defaults.size;
	export let full = defaults.full;
	export let variant = defaults.variant || 'filled';
	export let theme = defaults.theme;
	export let hovered = defaults.hovered;
	export let active = defaults.active;

	ringed = typeof ringed !== 'boolean' && variant === 'outline' ? true : ringed;

	const list = items.map((v) => {
		if (typeof v === 'string') return { label: v, value: v as any };
		return v;
	});

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

<select
	{...$$restProps}
	{id}
	class={classes}
	bind:value
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
>
	<slot>
		<option disabled selected value="">{$$restProps.placeholder || 'Please Select'}</option>
		{#each list as { value, label }}
			<option {value}>{label}</option>
		{/each}
	</slot>
</select>
