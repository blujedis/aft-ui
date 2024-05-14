<script>import { dividerDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { boolToMapValue, cleanObj } from "../../utils";
export let { orientation, dropshadowed, rounded, shadowed, size, theme, transitioned } = {
  ...cleanObj($themeStore.defaults?.component),
  ...defaults
};
const th = themer($themeStore);
$:
  dividerClasses = th.create("Divider").option("dividerBg", theme, theme).option("common", "transitioned", transitioned).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("dropshadows", boolToMapValue(dropshadowed), dropshadowed).option("dividerHorizontalMargin", size, size).prepend("divider", true).append("h-px ", orientation.startsWith("h")).append("w-px", orientation.startsWith("v")).append($$restProps.class, true).compile();
</script>

<div {...$$restProps} class={dividerClasses}></div>

<style>
	/* .divider:after {
		content: '\200b';
	} */
</style>
