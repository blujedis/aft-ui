<script>import { cardContentDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { getContext } from "svelte";
const context = getContext("Card");
export let { mode, size, theme, variant, wide } = {
  ...defaults,
  ...context?.globals
};
const th = themer($themeStore);
$:
  cardContentClasses = th.create("CardContent").variant("cardContent", variant, theme, variant).option("cardPadding", size, size && mode === "content").option("cardPaddingHeader", size, size && mode === "header").option("cardPaddingFooter", size, size && mode === "footer").append("px-0", wide).append($$restProps.class, true).compile(true);
</script>

<div {...$$restProps} class={cardContentClasses}>
	<slot />
</div>
