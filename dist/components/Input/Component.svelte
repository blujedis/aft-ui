<script>import { inputDefaults as defaults } from "./module";
import { themeStore, themer } from "../..";
import { Flushed } from "../Flushed";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder, boolToMapValue } from "../../utils";
export let {
  chars,
  disabled,
  focused,
  full,
  hovered,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  variant
} = {
  ...$themeStore.defaults?.component,
  ...defaults
};
const th = themer($themeStore);
$:
  inputClasses = th.create("Input").bundle(
    ["mainBg", "whiteText", "filledPlaceholder"],
    {
      frame: "text-body-light"
    },
    theme,
    variant === "filled"
  ).bundle(
    ["inputText", "mainRing"],
    { $base: "ring-1 ring-inset" },
    theme,
    variant === "outlined"
  ).bundle(
    ["mainBorder", "mainBorderGroupHover", "softBg", "inputText"],
    theme,
    variant === "soft"
  ).bundle(["mainBorder", "mainBorderGroupHover", "inputText"], theme, variant === "flushed").option("common", "focusedOutline", focused && variant !== "flushed").option("outlineFocus", theme, focused && variant !== "flushed").bundle(["inputText"], theme, variant === "text").option("common", "transitioned", transitioned).option("hovered", variant, theme, hovered).option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("roundeds", boolToMapValue(rounded), rounded && variant !== "flushed").option("shadows", boolToMapValue(shadowed), shadowed).option("common", "disabled", disabled).append("w-full", full).append("dark:bg-transparent", ["outlined", "flushed", "text"].includes(variant)).append("peer border-0", ["flushed"].includes(variant)).append("px-1", variant === "flushed").append("inline-flex items-center justify-center outline-none", true).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if variant === 'flushed'}
	<svelte:component this={Flushed} {theme} {focused}>
		<input {...$$restProps} use:forwardedEvents size={chars} class={inputClasses} on:input />
	</svelte:component>
{:else}
	<input {...$$restProps} use:forwardedEvents size={chars} class={inputClasses} on:input />
{/if}
