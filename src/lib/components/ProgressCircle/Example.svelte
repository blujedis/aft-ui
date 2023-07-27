<script lang="ts">
	import Section from '../_Example/Section.svelte';
	import SelectTheme from '../_Example/SelectTheme.svelte';
	import SelectSize from '../_Example/SelectSize.svelte';
	import SelectShadowed from '../_Example/SelectShadowed.svelte';
	import ListOptions from '../_Example/ListOptions.svelte';
	import ToggleOptions from '../_Example/ToggleOptions.svelte';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import Checkbox from '../_Example/Checkbox.svelte';
	import ProgressCircle, { type ProgressCircleVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';

	const title = 'Progress Circle';
	const description = 'Progress circle with animation.';
	const code = `
  `;
	let progress: ProgressCircle;

	const props = {
		animate: true,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		tracksize: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		variant: 'default' as ProgressCircleVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<Checkbox label="Animate" bind:checked={props.animate} />
		<!-- <Checkbox label="Full" bind:checked={props.full} /> -->
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectSize bind:value={props.tracksize} label="Track Size" />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class="grid grid-cols-8 gap-2">
		<label for="filled">
			<div class="text-sm">Filled:</div>
			{#key props}
				<ProgressCircle bind:this={progress} value={25} max={100} {...props} />
			{/key}
			<div class="flex space-x-2 mt-4">
				<button
					class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200"
					on:click={() => progress.store.set(0)}>0%</button
				>
				<button
					class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200"
					on:click={() => progress.store.set(25)}>25%</button
				>
				<button
					class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200"
					on:click={() => progress.store.set(35)}>35%</button
				>
				<button
					class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200"
					on:click={() => progress.store.set(55)}>55%</button
				>
				<button
					class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200"
					on:click={() => progress.store.set(75)}>75%</button
				>
				<button
					class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200"
					on:click={() => progress.store.set(100)}>100%</button
				>
			</div>
		</label>
	</div>
</ExamplePage>
