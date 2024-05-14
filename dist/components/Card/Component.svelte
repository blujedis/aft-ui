<script>import { cardDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { setContext } from "svelte";
import { cleanObj, boolToMapValue } from "../../utils";
export let {
  divided,
  dropshadowed,
  full,
  horizontal,
  href,
  maxwidth,
  rounded,
  shadowed,
  size,
  theme,
  variant
} = {
  ...cleanObj($themeStore.defaults?.component),
  ...defaults
};
const globals = cleanObj({
  horizontal,
  size,
  theme,
  variant
});
setContext("Card", { globals });
const th = themer($themeStore);
$:
  cardClasses = th.create("Card").option("elementRing", theme, divided || variant === "outlined").option("cardSizes", maxwidth, maxwidth).option("elementDivide", theme, divided).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("dropshadows", boolToMapValue(dropshadowed), dropshadowed).prepend(`card card-${variant}`, true).append(horizontal ? "divide-x" : "divide-y", divided || variant === "outlined").append("h-full", full).append("cursor-pointer", href).append(horizontal ? "flex" : "flex flex-col", true).append("overflow-hidden", true).append($$restProps.class, true).compile();
if (href)
  $$restProps.href = href;
</script>

<svelte:element this={href ? 'a' : 'div'} {...$$restProps} class={cardClasses}>
	<slot />
</svelte:element>
