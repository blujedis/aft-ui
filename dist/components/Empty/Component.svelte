<script>import { emptyDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder, boolToMapValue } from "../../utils";
export let {
  as,
  focused,
  full,
  hovered,
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
  emptyClasses = themer($themeStore).create("Empty").option("mainBorder", theme, true).option("common", "focusedOutlineVisible", focused).option("outlineFocusVisible", theme, focused).option("common", "transitioned", transitioned).option("emptySizes", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("hovered", variant, theme, hovered).append("w-full", full).append("flex items-center justify-center border-[3px] border-dashed relative", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:element this={as} use:forwardedEvents {...$$restProps} class={emptyClasses}>
	<slot />
</svelte:element>
