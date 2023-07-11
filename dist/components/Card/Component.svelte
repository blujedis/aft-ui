<script>import { cardDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { setContext } from "svelte";
export let { edged, rounded, shadowed, size, theme, variant, wide } = {
  ...defaults
};
setContext("Card", { globals: { size, theme, wide } });
const th = themer($themeStore);
$:
  cardClasses = th.create("Card").variant("card", variant, theme, true).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("ring-1 ring-black ring-opacity-5", edged).append("text-sm h-full", true).append($$restProps.class, true).compile(true);
</script>

<div {...$$restProps} class={cardClasses}>
	<slot />
</div>
