<script>import { tweened } from "svelte/motion";
import { progressBarDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { get_current_component } from "svelte/internal";
import { forwardEventsBuilder } from "../../utils";
import { onMount } from "svelte";
export let {
  animate,
  delay,
  duration,
  easing,
  full,
  interpolate,
  max,
  rounded,
  shadowed,
  size,
  theme,
  value,
  variant
} = {
  ...defaults
};
export const store = tweened(value, {
  delay,
  duration: !animate ? 0 : duration,
  easing,
  interpolate
});
let mounted = false;
$:
  progressClasses = themer($themeStore).create("ProgressBar").variant("progressBar", variant, theme, true).option("progressBarSizes", size, size).option("progressBarRoundedBar", rounded, rounded).option("progressBarRoundedValue", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full", full).append("appearance-none", true).append($$restProps.class, true).compile(true);
const forwardedEvents = forwardEventsBuilder(get_current_component());
onMount(() => {
  mounted = true;
});
</script>

<progress
	use:forwardedEvents
	{...$$restProps}
	class={progressClasses}
	class:visible={mounted}
	value={$store}
	{max}
>
	<slot />
</progress>
