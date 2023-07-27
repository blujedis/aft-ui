<script>import { kbdDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { onMount } from "svelte";
export let { full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
  ...defaults
};
let mounted = false;
$:
  kbdClasses = themer($themeStore).create("Kbd").variant("kbd", variant, theme, true).option("common", "transition", transitioned).option("badgePadding", size, size).option("badgeFontSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full", full).append("flex items-center justify-center", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
onMount(() => {
  mounted = true;
});
</script>

<kbd use:forwardedEvents {...$$restProps} class={kbdClasses} class:invisible={!mounted}>
	<slot />
</kbd>
