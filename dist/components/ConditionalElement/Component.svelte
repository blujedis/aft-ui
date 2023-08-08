<script>import { conditionalElementDefaults as defaults } from "./module";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
export let { as, condition, props } = {
  ...defaults
};
$:
  wrap = typeof condition === "function" ? condition() : condition;
const isElement = typeof as === "string";
const element = as;
const component = as;
const forwardEventsNoop = (node) => {
  return { destroy() {
  } };
};
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if wrap}
	{#if isElement}
		<svelte:element this={element} use:forwardedEvents {...$$restProps} {...props}>
			<slot />
		</svelte:element>
	{:else}
		<svelte:component this={component} {...props}>
			<slot />
		</svelte:component>
	{/if}
{:else}
	<slot />
{/if}
