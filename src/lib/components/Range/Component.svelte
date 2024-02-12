<script lang="ts">
	import { themeStore, themer, styler } from '$lib/theme';
	import { type RangeProps, rangeDefaults as defaults } from './module';
	import { onMount } from 'svelte';
	import type { ElementProps } from '$lib/types';
	import { boolToMapValue } from '$lib/utils';

	type $$Props = RangeProps & Omit<ElementProps<'input'>, 'size'>;

	export let { focused, full, rounded, transitioned, shadowed, size, theme } = {
		...defaults
	} as Required<RangeProps>;

	let ref: HTMLInputElement;

	const th = themer($themeStore);
	const st = styler($themeStore);

	$: rangeStyles = st
		.create('RangeStyles')
		.color('--track-background-color', $themeStore.options.common.rangeBg, true)
		.color('--thumb-background-color', `${theme}-${$themeStore.options.common.rangeThumb}`, true)
		.color('--track-accent-color', `${theme}-${$themeStore.options.common.rangeValue}`, true)
		.color('--thumb-border-color', `${theme}-${$themeStore.options.common.rangeValue}`, true)
		.option('rangeThumbSizes', size, '--thumb-size', size)
		.option('rangeBorderSizes', size, '--thumb-border-width', size)
		.append($$restProps.style, true)
		.compile();

	$: rangeClasses = th
		.create('RangeClasses')
		.option('common', 'transitioned', transitioned)
		.option('rangeTrackSizes', size, size)
		.option('roundeds', boolToMapValue(rounded), rounded)
		.option('shadows', boolToMapValue(shadowed), shadowed)
		.append('w-full', full)
		.append('appearance-none', true)
		.append($$restProps.class, true)
		.compile();

	// IMPORTANT: without min/max selected range
	// background will not be visible.
	$$restProps.min = $$restProps.min || 0;
	$$restProps.max = $$restProps.max || 100;

	function handleInputChange(e?: Event & { currentTarget: HTMLInputElement }) {
		const target = e?.currentTarget || ref;
		const min = parseFloat(target.min);
		const max = parseFloat(target.max);
		const val = parseFloat(target.value);
		target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
	}
	onMount(() => {
		handleInputChange();
	});
</script>

<input
	bind:this={ref}
	on:input={handleInputChange}
	type="range"
	{...$$restProps}
	class={rangeClasses}
	style={rangeStyles}
/>

<style>
	/* :root {
	 --color-range-dark: 255 255 255;
	} */

	input[type='range'] {
		background-color: var(--track-background-color);
		background-image: linear-gradient(var(--track-accent-color), var(--track-accent-color));
		background-size: 0% 100%;
		background-repeat: no-repeat;
	}

	/* IMPORTANT If you attempt to combine the below styles together 
	they will not be applied. Each pseudo selecteor for the 
	thumb must be defined for each browser type. It'd be SUPER
	if this were better standardized wouldn't it??
	*/

	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		height: var(--thumb-size);
		width: var(--thumb-size);
		border: solid var(--thumb-border-color);
		border-width: var(--thumb-border-width);
		border-radius: 50%;
		background-color: var(--thumb-background-color);
	}

	input[type='range']:focus::-webkit-slider-thumb {
		box-shadow: 0px 0px 0px 1px var(--thumb-background-color);
	}

	input[type='range']:focus::-moz-range-thumb {
		box-shadow: 0px 0px 0px 1px var(--thumb-background-color);
	}

	input[type='range']:focus::-ms-thumb {
		box-shadow: 0px 0px 0px 1px var(--thumb-background-color);
	}

	input[type='range']::-moz-range-thumb {
		appearance: none;
		height: var(--thumb-size);
		width: var(--thumb-size);
		border: solid var(--thumb-border-color);
		border-width: var(--thumb-border-width);
		border-radius: 50%;
		background: var(--thumb-background-color);
	}

	input[type='range']::-ms-thumb {
		appearance: none;
		height: var(--thumb-size);
		width: var(--thumb-size);
		border: solid var(--thumb-border-color);
		border-width: var(--thumb-border-width);
		border-radius: 50%;
		background: var(--thumb-background-color);
	}

	input[type='range']::-webkit-slider-runnable-track {
		-webkit-appearance: none;
		box-shadow: none;
		border: none;
		background: transparent;
		margin: 0 -2px;
	}

	input[type='range']::-moz-range-track {
		margin: 0 -2px;
	}
</style>
