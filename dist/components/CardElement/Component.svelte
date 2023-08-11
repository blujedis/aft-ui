<script>import { cardElementDefaults as defaults } from "./module";
import { themeStore, themer } from "../..";
import { getContext } from "svelte";
const context = getContext("Card");
export let { horizontal, size, theme, type, variant } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  cardElementClasses = th.create("CardContent").variant("cardElement", variant, theme, variant).option("cardPadding", size, size && type === "content").option("cardPaddingHeader", size, size && type === "header").option("cardPaddingFooter", size, size && type === "footer").option("cardFontSizes", size, size).append("flex-1", type === "content").append($$restProps.class, true).compile(true);
</script>

<div {...$$restProps} class={cardElementClasses}>
	<slot />
</div>
