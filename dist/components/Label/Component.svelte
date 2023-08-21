<script>import { labelDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { onMount } from "svelte";
export let {
  dropshadowed,
  full,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  variant,
  unstyled
} = {
  ...defaults
};
$:
  labelClasses = themer($themeStore).create("Label").variant("globals", variant, theme, true).option("common", "transition", transitioned).option("fieldFontSizes", size, size).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).option("dropshadows", shadowed, shadowed).append("w-full", full).append("flex items-center justify-center", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<label use:forwardedEvents {...$$restProps} class={labelClasses}>
	<slot />
</label>

<!-- 
<label for="floating_outlined" class="absolute text-sm duration-300 transform -translate-y-4 scale-75 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 text-gray-500 dark:text-gray-400 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 top-2">Floating outlined</label> -->
