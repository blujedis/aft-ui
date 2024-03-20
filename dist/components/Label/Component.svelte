<script>import { labelDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { boolToMapValue, forwardEventsBuilder } from "../../utils";
export let {
  dropshadowed,
  hovered,
  inline,
  full,
  rounded,
  shadowed,
  reversed,
  size,
  theme,
  transitioned,
  visible
} = {
  ...defaults
};
const th = themer($themeStore);
$:
  labelClasses = th.create("Label").bundle(["mainText"], theme, true).option("common", "transitioned", transitioned).option("fieldFontSizes", size, size).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("dropshadows", boolToMapValue(shadowed), shadowed).option("hovered", "text", theme, hovered).prepend("label", true).append("w-full", full).append("flex items-center space-x-2", inline).append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

{#if visible}
	<label use:forwardedEvents {...$$restProps} class={labelClasses}>
		<slot />
	</label>
{:else}
	<slot />
{/if}
