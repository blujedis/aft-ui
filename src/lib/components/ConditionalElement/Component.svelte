<script lang="ts">
	import { type ConditionalElementProps, conditionalElementDefaults as defaults } from './module';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '$lib/utils';
	import type { ElementProps, HTMLTag } from '$lib/types';

	type Tag = $$Generic<HTMLTag>;

	type $$Props = ConditionalElementProps<Tag> & ElementProps<Tag>; // AdditionalProps;

	export let { as, condition, props } = {
		...defaults
	} as $$Props;

	$: wrap = typeof condition === 'function' ? condition() : condition;

	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if wrap}
	<svelte:element this={as} use:forwardedEvents {...$$restProps} {...props}>
		<slot />
	</svelte:element>
{:else}
	<slot />
{/if}
