<script>import { cardDefaults as defaults } from "./module";
import { themeStore, themer } from "../..";
import { setContext } from "svelte";
import { cleanObj } from "../../utils";
export let { divided, full, horizontal, maxwidth, rounded, shadowed, size, theme, variant } = {
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
  cardClasses = th.create("Card").option("cardSizes", maxwidth, maxwidth).option("divideds", theme, divided).option("common", "ringed", divided).option("roundeds", rounded, rounded).option("common", "ringed", true).option("shadows", shadowed, shadowed).append(horizontal ? "divide-x" : "divide-y", divided).append("h-full", full).append(horizontal ? "flex" : "flex flex-col", true).append("overflow-hidden", true).append($$restProps.class, true).compile(true);
</script>

<div {...$$restProps} class={cardClasses}>
	<slot />
</div>
