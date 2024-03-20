<script>import { conditionalElementDefaults as defaults } from "./module";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
export let { as, condition } = {
  ...defaults
};
$:
  wrap = typeof condition === "function" ? condition() : condition;
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if wrap}
	<svelte:element this={as} use:forwardedEvents {...$$restProps}>
		<slot />
	</svelte:element>
{:else}
	<slot />
{/if}
