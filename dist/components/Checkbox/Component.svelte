<script>import { checkboxDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder, boolToMapValue, cleanObj } from "../../utils";
export let {
  checked,
  disabled,
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
  ...cleanObj($themeStore.defaults?.component),
  ...defaults
};
$:
  checkboxClasses = themer($themeStore).create("Checkbox").bundle(["defaultText"], theme, true).option("hovered", variant, theme, hovered).option("common", "focusedOutline", focused).option("outlineFocus", theme, focused).option("common", "transitioned", transitioned).option("checkboxSizes", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("common", "disabled", disabled).prepend(`checkbox checkbox-${variant}`, true).append("w-full", full).append(
    // to remove default styling both ring and ring-offset
    "flex items-center justify-center form-checkbox focus:ring-0 focus:ring-offset-0 bg-transparent",
    true
  ).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<input use:forwardedEvents {...$$restProps} bind:checked type="checkbox" class={checkboxClasses} />
