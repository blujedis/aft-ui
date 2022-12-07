<script lang="ts">
	import { } from '../button/Component.svelte';
	import { Builder, normalize } from '@forewind/util';
	import type { PickElement } from '$lib/types';
	import themeStore from '../init';

	type ElementProps = PickElement<'button', 'size'>;
	type Defaults = typeof defaults;
	interface $$Props extends ElementProps, Defaults {}

	const { palette, components } = $themeStore;
	const button = normalize(components.dropdown.main, palette);
	const b = new Builder(button, palette);

	const defaults = b.defaults({
		base: true,
		size: 'md'
	});

	export let base = defaults.base;

	const classes = b
		.addFeature('base', base)
		.bundle();
</script>

