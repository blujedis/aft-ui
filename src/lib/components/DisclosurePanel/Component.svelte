<script lang="ts">
	import { transitioner, type DisclosureContext } from '../Disclosure/module';
	import { getContext, onMount } from 'svelte';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '../../utils';
	import { type DisclosurePanelProps, disclosurePanelDefaults as defaults } from './module';
	import type { ElementProps, HTMLTag } from '../../types';

	type Tag = $$Generic<HTMLTag>;
	type $$Props = DisclosurePanelProps<HTMLTag> & ElementProps<'div'>;

	export let { as, unmount } = { ...defaults } as Required<$$Props>;
	const context = getContext<DisclosureContext>('Disclosure');
	const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if (unmount && $context.visible) || !unmount}
	<svelte:element
		this={as}
		{...$$restProps}
		use:forwardedEvents
		transition:transitioner={context?.transition}
	>
		<slot />
	</svelte:element>
{/if}
