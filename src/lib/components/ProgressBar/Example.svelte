<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import ProgressBar, { type ProgressBarVariant } from '.';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';

	const title = 'Progress Bar';
	const description = 'Progress bar component with animation.';
	const code = `
  `;
	let progress: ProgressBar;

	const props = {
		animate: true,
		full: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'light' as ThemeColor,
		variant: 'default' as ProgressBarVariant
	};
</script>

<ExamplePage {title} {description} {code}>

	<div class="grid grid-cols-8 gap-2">
		<label for="filled">
			<div class="text-sm">Filled:</div>
			{#key props}
				<ProgressBar bind:this={progress} value={65} max={100} {...props} />
			{/key}
			<div class="flex space-x-2">
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
