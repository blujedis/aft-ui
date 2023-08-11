<script>import { tileDefaults as defaults } from "./module";
import { themeStore, themer } from "../..";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { onMount } from "svelte";
export let { full, rounded, shadowed, size, theme, variant } = {
  ...defaults
};
const th = themer($themeStore);
$:
  inputClasses = th.create("Tile").variant("tile", variant, theme, true).option("fieldFontSizes", size, size).option("boxPadding", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full h-full", full).append("inline-flex flex-col items-center justify-center", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<div {...$$restProps} use:forwardedEvents class={inputClasses}>
	<slot />
</div>
