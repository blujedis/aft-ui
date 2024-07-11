<script>import { iconDefaults as defaults } from "./module";
import Icon from "@iconify/svelte";
import { themer, themeStore } from "../../theme";
import { cleanObj } from "../../utils";
export let { hovered, icon, size, stroke, theme, transitioned } = {
  ...cleanObj($themeStore.defaults?.component, ["focused", "shadowed", "rounded"]),
  ...defaults
};
const th = themer($themeStore);
$: iconClasses = th.create("Icon").option("iconSizes", size, size).option("iconText", theme, theme && !stroke).option("iconStroke", theme, theme && stroke).option("hovered", "filled", theme, hovered).option("common", "transitioned", transitioned).prepend(`icon icon-${theme}`, true).append("inline-flex pointer-events-none", true).append($$restProps.class, true).compile();
</script>

<Icon {icon} class={iconClasses} aria-hidden={true} />
