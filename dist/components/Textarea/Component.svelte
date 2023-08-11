<script>import { textareaDefaults as defaults } from "./module";
import { themeStore, themer } from "../..";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
export let {
  disabled,
  focused,
  full,
  resize,
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
  textareaClasses = themer($themeStore).create("Textarea").variant("textarea", variant, theme, true).option("focusedRing", theme, focused).option("placeholders", theme, true).option("common", "transition", transitioned).option("resizes", resize, resize).option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).option("disableds", theme, disabled).append("w-full", full).append("flex items-center justify-center form-textarea border-0", true).append("border-0 ring-1 ring-black ring-opacity-5", variant === "filled").append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<textarea {...$$restProps} use:forwardedEvents class={textareaClasses} />
