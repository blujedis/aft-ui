<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import ExampleComponent from './ExampleComponent.svelte';
	import { usePopover, useTooltip } from '$lib/hooks';
	import { Popover } from '.';

	const title = 'Popover';
	const description = 'Uses Popper to position tooltips and popover informational components.';

	const classes =
		'rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

	let visible = false;

	const [tooltip] = useTooltip();

	const [mytooltip] = useTooltip({
		Component: ExampleComponent,
		events: 'click', // events used in triggering.
		offset: 12
	});

	const [trigger, content] = usePopover();

	function handleClick() {
		visible = !visible;
	}
</script>

<ExamplePage {title} {description}>
	<div class="grid grid-cols-3 gap-4 p-4">
		<label>
			<div class="text-sm mb-4">Default Using Title Attribute (Trigger: hover)</div>
			<button
				class={classes}
				use:tooltip={{ content: 'Hello My Tooltip' }}
				title="Hello Tooltip">Basic Tooltip</button
			>
		</label>

		<label>
			<div class="text-sm mb-4">Passing Custom Component (Trigger: click)</div>
			<button class={classes} use:mytooltip title="Hello Tooltip">Custom Component</button>
		</label>

		<label>
			<div class="text-sm mb-4">Manual Popover Statically Defined (Trigger: click)</div>
			<button class={classes} on:click={handleClick} use:trigger> Manually Triggered </button>
		</label>

		{#if visible}
			<div
				use:content={{ offset: 6 }}
				class="px-4 py-1 bg-violet-600 text-white shadow-sm rounded-md text-sm"
			>
				Hello World
			</div>
		{/if}
	</div>
</ExamplePage>
