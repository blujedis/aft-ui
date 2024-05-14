<script>import { get_current_component } from "svelte/internal";
import { themer, themeStore } from "../../theme";
import { forwardEventsBuilder, boolToMapValue, cleanObj } from "../../utils";
import { lazyImage } from "../../utils/lazyImage";
import { imageDefaults as defaults } from "./module";
export let { alt, fit, full, lazyload, position, rounded, shadowed, src } = {
  ...cleanObj($themeStore.defaults?.component, [
    "transitioned",
    "focused",
    "hovered",
    "size",
    "theme"
  ]),
  ...defaults
};
const lazyloader = lazyload ? lazyImage(lazyload === true ? {} : lazyload) : () => {
};
$:
  inputClasses = themer($themeStore).create("Image").option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("objectFit", position ? "none" : fit, fit).option("objectPosition", position, position).prepend(`image`, true).append("w-full h-full", full === true).append("w-full", ["w", "width"].includes(full)).append("h-full", ["h", "height"].includes(full)).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if lazyload}
	<img {...$$restProps} use:forwardedEvents use:lazyloader={src} {alt} class={inputClasses} />
{:else}
	<img {...$$restProps} use:forwardedEvents {src} {alt} class={inputClasses} />
{/if}
