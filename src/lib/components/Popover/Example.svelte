<script lang="ts">
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import ExampleComponent from './ExampleComponent.svelte';
	import { tooltip, usePopover } from '$lib/hooks';

	const title = 'Popover';
	const description = 'Uses Popper to position tooltips and popover informational components.';
	const code = `
  `;

	const classes =
		'rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

	let visible = false;
	let ref: HTMLDivElement | undefined;

	const { } = usePopover({ events: 'click' });

	function handleClick() {
		// if (visible) hide();
		// else show();
		// visible = !visible;
	}
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-3 gap-4 p-4">
		<label>
			<div class="text-sm mb-4">Default Using Title Attribute (Trigger: hover)</div>
			<button
				class={classes}
				use:tooltip={{ props: { variant: 'filled', theme: 'primary' } }}
				title="Hello Tooltip">Basic Tooltip</button
			>
		</label>

		<label>
			<div class="text-sm mb-4">Passing Custom Component (Trigger: click)</div>
			<button
				class={classes}
				use:tooltip={{ events: 'click', Component: ExampleComponent }}
				title="Hello Tooltip">Custom Component</button
			>
		</label>

		<label>
			<div class="text-sm mb-4">Manual Popover Statically Defined (Trigger: click)</div>
			<button class={classes} on:click={handleClick} use:register={{ popover: ref }}>
				Manually Triggered
			</button>
		</label>

		{#if visible}
			<div bind:this={ref}>Hello World</div>
		{/if}
	</div>
</ExamplePage>
