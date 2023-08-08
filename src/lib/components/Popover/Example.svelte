<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import ExampleComponent from './ExampleComponent.svelte';
	import { popover } from '$lib/hooks';

	let ref = undefined as HTMLButtonElement | undefined;

	const title = 'Popover';
	const description = 'Uses Popper to position tooltips and popover informational components.';
	const code = `
  `;

	let visible = false;

	// const { show, hide } = usePopover({

	// })
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4 p-4">
		<label>
			<div class="text-sm">Default Using Title Attribute:</div>
			<button
				use:popover={{ events: 'click', props: { variant: 'filled', theme: 'primary' } }}
				title="Hello Tooltip">Tooltip Button</button
			>
		</label>

		<label>
			<div class="text-sm">Passing a Component</div>
			<button use:popover={{ events: 'click', Component: ExampleComponent }} title="Hello Tooltip"
				>Tooltip Button</button
			>
		</label>

		{#if visible}{/if}
	</div>
</ExamplePage>
