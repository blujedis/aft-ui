<script>import { labelDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { onMount } from "svelte";
export let {
  dropshadowed,
  full,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  variant,
  unstyled
} = {
  ...defaults
};
$:
  labelClasses = themer($themeStore).create("Label").variant("label", variant, theme, true).option("common", "transition", transitioned).option("fieldFontSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).option("dropshadows", shadowed, shadowed).append("w-full", full).append("flex items-center justify-center", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<label use:forwardedEvents {...$$restProps} class={labelClasses}>
	<slot />
</label>
