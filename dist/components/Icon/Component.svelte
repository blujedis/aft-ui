<script>import { iconDefaults as defaults } from "./module";
import Icon from "@iconify/svelte";
import { themer, themeStore } from "../../theme";
export let { hovered, icon, size, stroke, theme, transitioned } = {
  ...defaults
};
const th = themer($themeStore);
$:
  _theme = ["white", "black"].includes(theme) ? "" : theme;
$:
  iconClasses = th.create("Icon").option("iconSizes", size, size).option("iconText", theme, theme && !stroke).option("iconStroke", theme, theme && stroke).option("hovered", "filled", theme, hovered).option("common", "transitioned", transitioned).append($$restProps.class, true).compile();
</script>

<Icon {icon} class={iconClasses} aria-hidden={true} />
