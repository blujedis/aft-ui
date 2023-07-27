<script>import { emptyDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { onMount } from "svelte";
export let { as, full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
  ...defaults
};
let mounted = false;
$:
  emptyClasses = themer($themeStore).create("Empty").variant("empty", variant, theme, true).option("common", "transition", transitioned).option("emptySizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full", full).append("flex items-center justify-center", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
onMount(() => {
  mounted = true;
});
</script>

<svelte:element
	this={as}
	use:forwardedEvents
	{...$$restProps}
	class={emptyClasses}
	class:invisible={!mounted}
>
	<slot />
</svelte:element>
