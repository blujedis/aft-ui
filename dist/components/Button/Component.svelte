<script>import { get_current_component } from "svelte/internal";
import { boolToMapValue, forwardEventsBuilder } from "../../utils";
import { themeStore, themer } from "../../theme";
import { buttonDefaults as defaults } from "./module";
export let {
  as,
  bordered,
  disabled,
  focused,
  full,
  hovered,
  rounded,
  shadowed,
  dropshadowed,
  size,
  theme,
  transitioned,
  variant,
  underlined
} = {
  ...$themeStore?.defaults?.component,
  ...defaults
};
const th = themer($themeStore);
const href = "#";
$:
  buttonClasses = th.create("Button").bundle(["mainText"], theme, variant === "text").bundle(
    ["mainBg", "whiteText"],
    { frame: "text-light dark:text-dark" },
    theme,
    variant === "filled"
  ).bundle(["mainText", "mainRing"], { $base: "ring-1 ring-inset" }, theme, variant === "outlined").bundle(["mainText", "ghostBgHover"], { dark: "hover:text-white" }, theme, variant === "ghost").bundle(["softText", "softBg"], theme, variant === "soft").option("hovered", variant, theme, hovered).option("common", "focusedOutlineVisible", focused).option("outlineFocusVisible", theme, focused).option("common", "transitioned", transitioned).option("common", "ringed", bordered).option("fieldFontSizes", size, size).option("fieldLeading", size, size).option("buttonPadding", size, size && variant !== "text").option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed && variant !== "text").option(
    "dropshadows",
    boolToMapValue(shadowed && variant === "text" ? shadowed : dropshadowed),
    shadowed && variant === "text" || dropshadowed
  ).option("common", "disabled", disabled).append("underline", underlined && underlined !== "hover").append("hover:underline", underlined === "hover").append("max-w-fit", !full).append("w-full", full).append("ring-1", bordered).append("inline-flex items-center justify-center cursor-pointer outline-none", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if as === 'button'}
	<button use:forwardedEvents {...$$restProps} class={buttonClasses} {disabled}>
		<slot />
	</button>
{:else}
	<a use:forwardedEvents {href} {...$$restProps} class={buttonClasses} aria-disabled={disabled}>
		<slot />
	</a>
{/if}
