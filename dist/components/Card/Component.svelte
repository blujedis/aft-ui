<script>import { cardDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { onMount, setContext } from "svelte";
import { cleanObj } from "../../utils";
export let { rounded, shadowed, size, theme, variant, wide } = {
  ...defaults
};
const globals = cleanObj({
  size,
  theme,
  wide
});
setContext("Card", { globals });
const th = themer($themeStore);
let mounted = false;
$:
  cardClasses = th.create("Card").variant("card", variant, theme, true).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("h-full", true).append($$restProps.class, true).compile(true);
onMount(() => {
  mounted = true;
});
</script>

<div {...$$restProps} class={cardClasses} class:visible={mounted}>
	<slot />
</div>
