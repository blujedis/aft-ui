<script>import { radioDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
export let {
  disabled,
  focused,
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
  checkboxClasses = themer($themeStore).create("Radio").variant("radio", variant, theme, true).option("focused", theme, focused).option("focusedRingSizes", "two", focused).remove("focusedFilters", focused, focused).option("common", "transition", transitioned).option("iconSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).option("disableds", theme, disabled).append("w-full", full).append("flex items-center justify-center form-radio", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<input {...$$restProps} type="radio" use:forwardedEvents class={checkboxClasses} />
