<script>
	import { conditionalElementDefaults as defaults } from './module';
	import { get_current_component } from 'svelte/internal';
	import { forwardEventsBuilder } from '../../utils';
	export let { as, events, condition } = {
		...defaults
	};
	$: wrap = typeof condition === 'function' ? condition() : condition;
	const forwardEventsNoop = (node) => {
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
