<script>import { cardContentDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { getContext } from "svelte";
const context = getContext("Card");
export let { type, size, theme, variant, wide } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  cardContentClasses = th.create("CardContent").variant("cardContent", variant, theme, variant).option("cardPadding", size, size && type === "content").option("cardPaddingHeader", size, size && type === "header").option("cardPaddingFooter", size, size && type === "footer").option("cardFontSizes", size, size).append("px-0", wide).append($$restProps.class, true).compile(true);
</script>

<div {...$$restProps} class={cardContentClasses}>
	<slot />
</div>
