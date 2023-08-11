<script>import { badgeDefaults as defaults } from "./module";
import { themeStore, themer } from "../..";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { onMount } from "svelte";
export let { removable, full, rounded, shadowed, size, theme, transitioned, variant, unstyled } = {
  ...defaults
};
const th = themer($themeStore);
$:
  badgeClasses = unstyled ? th.create("Badge").append($$restProps.class, true).compile() : th.create("Badge").variant("badge", variant, theme, true).option("common", "transition", transitioned).option("focusedRingVisible", theme, removable).remove("focus:", true).option("badgePadding", size, size && !removable).option("badgeFontSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full", full).append("z-20 badge", true).append("badge-removable", removable).append("relative inline-flex items-center", !removable).append($$restProps.class, true).compile(true);
</script>

<span {...$$restProps} class={badgeClasses}>
	<slot />
</span>
