<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { ProgressCircle, type ProgressCircleVariant } from '.';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

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
		theme: 'default' as ThemeColor,
		variant: 'filled' as ProgressCircleVariant
	};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-8 gap-2">
		{#each colors as color}
			<label for={color}>
				<div class="text-sm">Filled:</div>
				<ProgressCircle bind:this={progress} {...props} value={25} max={100} theme={color} />
			</label>
		{/each}
	</div>
	<div class="flex space-x-2 mt-4">
		<button
			class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200 dark:bg-frame-600 dark:hover:bg-frame-700"
			on:click={() => progress.store.set(0)}>0%</button
		>
		<button
			class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200 dark:bg-frame-600 dark:hover:bg-frame-700"
			on:click={() => progress.store.set(25)}>25%</button
		>
		<button
			class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200 dark:bg-frame-600 dark:hover:bg-frame-700"
			on:click={() => progress.store.set(35)}>35%</button
		>
		<button
			class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200 dark:bg-frame-600 dark:hover:bg-frame-700"
			on:click={() => progress.store.set(55)}>55%</button
		>
		<button
			class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200 dark:bg-frame-600 dark:hover:bg-frame-700"
			on:click={() => progress.store.set(75)}>75%</button
		>
		<button
			class="inline-flex py-1 px-4 bg-frame-100 hover:bg-frame-200 dark:bg-frame-600 dark:hover:bg-frame-700"
			on:click={() => progress.store.set(100)}>100%</button
		>
	</div>
</ExamplePage>
