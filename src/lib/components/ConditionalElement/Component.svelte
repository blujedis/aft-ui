<script lang="ts">
	import { type ConditionalElementProps, conditionalElementDefaults as defaults } from './module';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementNativeProps, HTMLTag } from '../../types';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = ConditionalElementProps<Tag> & ElementNativeProps<Tag>;

	export let { as, events, condition } = {
		...defaults
	} as Required<ConditionalElementProps<Tag>>;

	$: wrap = typeof condition === 'function' ? condition() : condition;

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
	<svelte:element this={as} use:forwardedEvents {...$$restProps}>
		<slot />
	</svelte:element>
{:else}
	<slot />
{/if}
