<script lang="ts">
	import type{ SvelteComponent} from 'svelte';
	import { type ConditionalElementProps, type ConditionalElementTypeProps, conditionalElementDefaults as defaults } from './module';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type {  HTMLTag } from '../../types';

	type Tag = $$Generic<HTMLTag | typeof SvelteComponent>;
	type $$Props = ConditionalElementProps<Tag> & ConditionalElementTypeProps<Tag>;

	export let { as, events, condition } = {
		...defaults
	} as ConditionalElementProps<Tag> & ConditionalElementTypeProps<Tag>;

	$: wrap = typeof condition === 'function' ? condition() : condition;

	const isElement = typeof as === 'string';
	const element = as as Tag extends HTMLTag ? Tag : never;
	const component = as as Tag extends typeof SvelteComponent ? Tag : never;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const forwardEventsNoop = (node: any) => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return { destroy() {} };
	};
	const forwardedEvents = events
		? forwardEventsBuilder(get_current_component())
		: forwardEventsNoop;
</script>

{#if wrap}
	{#if isElement}
		<svelte:element this={element} use:forwardedEvents {...$$restProps}>
			<slot />
		</svelte:element>
	{:else}
		<svelte:component this={component} >
			<slot />
		</svelte:component>
	{/if}
{:else}
	<slot />
{/if}
