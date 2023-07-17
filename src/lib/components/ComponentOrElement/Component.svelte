<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { forwardEventsBuilder } from '../../utils';
	import { get_current_component } from 'svelte/internal';
	import type { HTMLTag } from '../../types';

	type T = $$Generic<HTMLTag | typeof SvelteComponent<any>>;
	type $$Props = { as: T };

	export let as: T;
	const forwardedEvents = forwardEventsBuilder(get_current_component());
	const isElement = typeof as === 'string';
	const element = as as T extends HTMLTag ? T : never;
	const component = as as T extends typeof SvelteComponent ? T : never;
</script>

{#if isElement}
	<svelte:element this={element} {...$$restProps} use:forwardedEvents>
		<slot />
	</svelte:element>
{:else}
	<svelte:component this={component} {...$$restProps}>
		<slot />
	</svelte:component>
{/if}
