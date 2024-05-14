<script>import { textareaDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder, boolToMapValue } from "../../utils";
export let {
  disabled,
  focused,
  full,
  hovered,
  resize,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  variant,
  value
} = {
  ...defaults
};
const th = themer($themeStore);
$:
  textareaClasses = th.create("Textarea").bundle(
    ["unfilledText", "mainRing"],
    { $base: "ring-1 ring-inset" },
    theme,
    variant === "outlined"
  ).bundle(["softBg", "unfilledText"], theme, variant === "soft").bundle(["unfilledText"], theme, variant === "text").option("common", "focusedOutline", focused).option("outlineFocus", theme, focused).option("common", "transitioned", transitioned).option("hovered", variant, theme, hovered).option("resizes", resize, resize).option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("common", "disabled", disabled).append("w-full", full).append("dark:bg-transparent", ["outlined", "text"].includes(variant)).append("flex items-center justify-center  focus:outline-none border-0", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<textarea {...$$restProps} use:forwardedEvents bind:value class={textareaClasses} />
