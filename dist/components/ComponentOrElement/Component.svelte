<script>import { forwardEventsBuilder } from "../../utils";
import { get_current_component } from "svelte/internal";
export let as;
const forwardedEvents = forwardEventsBuilder(get_current_component());
const isElement = typeof as === "string";
const element = as;
const component = as;
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
