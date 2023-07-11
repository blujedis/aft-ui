<script>import { checkboxDefaults as defaults } from "./module";
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
  checkboxClasses = themer($themeStore).create("Checkbox").variant("checkbox", variant, theme, true).option("focused", theme, focused).option("focusedRingSizes", "two", focused).remove(focused === "visible" ? "focus:" : "focus-visible:", true).option("common", "transition", transitioned).option("checkboxSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).option("disableds", theme, disabled).append("w-full", full).append("flex items-center justify-center form-checkbox", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<input {...$$restProps} type="checkbox" use:forwardedEvents class={checkboxClasses} />
