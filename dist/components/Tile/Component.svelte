<script>import { tileDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder, boolToMapValue } from "../../utils";
export let {
  bordered,
  dropshadowed,
  focused,
  full,
  href,
  hovered,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  variant
} = {
  ...defaults
};
const th = themer($themeStore);
$:
  tileClasses = th.create("Tile").bundle(["mainBg", "whiteText"], theme, variant === "filled").bundle(["mainText", "mainRing"], { $base: "ring-1 ring-inset" }, theme, variant === "outlined").bundle(["softText", "softBg"], theme, variant === "soft").option("hovered", variant, theme, hovered).option("common", "focusedOutlineVisible", focused).option("outlineFocusVisible", theme, focused).option("common", "transitioned", transitioned).option("common", "bordered", bordered).option("fieldFontSizes", size, size).option("boxPadding", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("dropshadows", boolToMapValue(dropshadowed), dropshadowed).prepend("tile", true).append("border", bordered).append("cursor-pointer", href).append("w-full h-full", full).append("flex flex-col items-center justify-center", true).append($$restProps.class, true).compile();
if (href)
  $$restProps.href = href;
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<svelte:element this={href ? 'a' : 'div'} {...$$restProps} use:forwardedEvents class={tileClasses}>
	<slot />
</svelte:element>
