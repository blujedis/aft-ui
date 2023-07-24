<script lang="ts">
	import { onMount } from 'svelte';
	import Values from 'values.js';

	export let color = '#4033F0';
	export let label = 'contained' as 'top' | 'bottom' | 'contained' | '';
	export let size = 90;
	export let swatches = false;
	export let format = 'hex' as 'hex' | 'rgb';
	export let onChange: (
		value: string,
		info: { brightness: number; format: 'hex' | 'rgb'; swatches: string[] }
	) => void;

	const wrapperStyle = `background-color: ${color};`;
	const inputStyle = `height: ${size}px; width: ${size}px; line-height: ${size}px; float: left;`;
	const labelStyle = ``;

	let input: HTMLInputElement;
	let wrapper: HTMLDivElement;
	let defaultColor = color;
	let formattedColor = color;

	function setColor (value?: string)  {
		const val = value || input.value;
		const newColor = new Values(val);
		const level = newColor.getBrightness();
		formattedColor = format === 'rgb' ? newColor.rgbString() : val;
		let _swatches = [] as string[];

		// If swatches build them.
		// they will be added to the parent
		// components variable using the onChange
		// const method exported above.
		if (swatches)
			_swatches = newColor.all(18).map((v) => (format === 'rgb' ? v.rgbString() : v.hexString()));
		wrapper.style.backgroundColor = val;

		if (onChange)
			onChange(formattedColor, {
				brightness: level,
				format,
				swatches: _swatches.slice(0, -1)
			});
	};

	export function update (value: string) { setColor(value); }

	export function reset () { setColor(defaultColor); }

	onMount(() => {
		defaultColor = color || defaultColor;
		setColor();
	});
</script>

<div class="inline-flex flex-col text-center">
	{#if label === 'top' && formattedColor}
		<span class="uppercase">{formattedColor}</span>
	{/if}
	<div
		class="rounded-md relative flex items-center justify-center"
		bind:this={wrapper}
		style={wrapperStyle}
	>
		<input
			type="color"
			bind:this={input}
			bind:value={color}
			on:input={() => setColor()}
			style={inputStyle}
		/>
		{#if label === 'contained' && formattedColor}
			<span
				class="uppercase text-white absolute text-sm left-0 right-0 m-auto overflow-hidden pointer-events-none"
				style={labelStyle}
			>
				{formattedColor}
			</span>
		{/if}
	</div>
	{#if label === 'bottom' && formattedColor}
		<span class="uppercase">{formattedColor}</span>
	{/if}
</div>

<style>
	input[type='color'] {
		opacity: 0;
		display: block;
		border: none;
	}
</style>
