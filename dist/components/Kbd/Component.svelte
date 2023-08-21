<script>import { kbdDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
export let { full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
  ...defaults
};
$:
  kbdClasses = themer($themeStore).create("Kbd").variant("globals", variant, theme, true).option("common", "transition", transitioned).option("badgePadding", size, size).option("badgeFontSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full", full).append("inline-flex items-center justify-center", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<kbd use:forwardedEvents {...$$restProps} class={kbdClasses}>
	<slot />
</kbd>
