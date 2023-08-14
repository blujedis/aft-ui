<script>import { get_current_component } from "svelte/internal";
import { themer, themeStore } from "../../theme";
import { forwardEventsBuilder } from "../../utils";
import { imageDefaults as defaults } from "./module";
export let { fit, full, position, rounded, shadowed } = {
  ...defaults
};
$:
  inputClasses = themer($themeStore).create("Image").option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).option("objectFit", position ? "none" : fit, fit).option("objectPosition", position, position).append("w-full h-full", full === true).append("w-full", ["w", "width"].includes(full)).append("h-full", ["h", "height"].includes(full)).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<img {...$$restProps} use:forwardedEvents class={inputClasses} alt={$$restProps.alt} />
