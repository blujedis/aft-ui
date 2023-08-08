<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import { ProgressBar } from ".";
import { colors } from "../../constants";
const title = "Progress Bar";
const description = "Progress bar component with animation.";
const code = `
  `;
let progress;
const props = {
  animate: true,
  full: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  variant: "filled"
};
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-6 gap-4">
		{#each colors as color}
			{#key props}
				<label for={color}>
					<div class="text-sm">Filled:</div>
					<ProgressBar bind:this={progress} {...props} value={65} max={100} theme={color} />
				</label>
			{/key}
		{/each}
	</div>
	<div class="flex space-x-2 mt-8">
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
