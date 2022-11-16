<script lang="ts">
	import { Builder, genCssVar, normalize, setStyleProperty } from '@forewind/util';
	import type { BaseSize, PickElement } from '$lib/types';
	import themeStore from '../init';
	import { onMount } from 'svelte';

	type ElementProps = PickElement<'input', 'size'>;
	type Defaults = typeof defaults;

	interface $$Props extends ElementProps, Defaults {
		checked?: boolean;
		group?: any;
	}

	const { palette, components, config } = $themeStore;
	const slider = normalize(components.slider.main, palette);
	const b = new Builder(slider, palette);

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
	export let shadow = defaults.shadow;
	export let size = defaults.size;
	export let theme = defaults.theme;
	export let hovered = defaults.hovered;
	export let transition = defaults.transition;
	export let active = defaults.active;

	let ref: HTMLInputElement;

	const classes = b
		.addFeature('base', base)
		.addFeature('shadow', shadow)
		.addHandlerClass('rounded', true, size as BaseSize)
		.addFeature('size', size)
		.addFeature('transition', transition)
		.addFeature('active', active)
		.addFeature('hovered', hovered)
		.addUserClass(config.common.disabled, !!$$restProps.disabled)
		.addUserClass($$restProps.class)
		.addVariant('default', theme)
		.bundle();

	function handleInputChange(e?: Event & { currentTarget: HTMLInputElement }) {
		const target = e?.currentTarget || ref;
		const min = parseFloat(target.min);
		const max = parseFloat(target.max);
		const val = parseFloat(target.value);
		target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
	}

	function getVars(currentTheme = theme) {
		if (typeof currentTheme === 'undefined')
			return {
				start: '#64748b', // slate-500
				end: '#475569' // slate-600
			};
		return {
			start: `var(${genCssVar(currentTheme as any, 500)})`,
			end: `var(${genCssVar(currentTheme as any, 600)})`
		};
	}

	function setVars(node: HTMLElement, start: string, end: string) {
		setStyleProperty(node, `--start`, start);
		setStyleProperty(node, `--end`, end);
	}

	function cssVars(node: HTMLElement) {
		const { start, end } = getVars(theme);
		setVars(node, start, end);
		return {
			update() {
				const { start, end } = getVars(theme);
				setVars(node, start, end);
			}
		};
	}

	onMount(() => {
		handleInputChange();
	});
</script>

<input
	{...$$restProps}
	bind:this={ref}
	type="range"
	{value}
	class={classes}
	use:cssVars
	on:change
	on:change={handleInputChange}
/>

<style>
	input[type='range'] {
		-webkit-appearance: none;
		margin-right: 15px;
		/* background-color: rgba(151, 151, 151, 0.25); */
		background-image: linear-gradient(var(--start), var(--end));
		background-size: 0% 100%;
		background-repeat: no-repeat;
	}

	input[type='range'].thumb-xs::-webkit-slider-thumb {
		height: 15px;
		width: 15px;
		border-width: 3px;
	}
	input[type='range'].thumb-sm::-webkit-slider-thumb {
		height: 18px;
		width: 18px;
		border-width: 3px;
	}
	input[type='range'].thumb-md::-webkit-slider-thumb {
		height: 22px;
		width: 22px;
		border-width: 3px;
	}
	input[type='range'].thumb-lg::-webkit-slider-thumb {
		height: 28px;
		width: 28px;
		border-width: 3px;
	}
	input[type='range'].thumb-xl::-webkit-slider-thumb {
		height: 36px;
		width: 36px;
		border-width: 4px;
	}
	input[type='range'].thumb-2xl::-webkit-slider-thumb {
		height: 44px;
		width: 44px;
		border-width: 4px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: 2px solid #ccc;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
	}

	/*  Firefox */
	input[type='range']::-moz-range-thumb {
		border: 2px solid #ccc;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
	}

	/*  IE */
	input[type='range']::-ms-thumb {
		border: 2px solid #ccc;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
	}

	input[type='range']::-webkit-slider-runnable-track {
		-webkit-appearance: none;
		box-shadow: none;
		border: none;
		background: transparent;
	}
</style>
