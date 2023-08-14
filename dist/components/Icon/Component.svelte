<script>import { iconDefaults as defaults } from "./module";
import Icon from "@iconify/svelte";
import { themer, themeStore } from "../../theme";
export let { icon, size, unstyled } = { ...defaults };
const th = themer($themeStore);
$:
  iconClasses = unstyled ? $$restProps.class : th.create("Icon").option("iconSizes", size, size).append($$restProps.class, true).compile(true);
</script>

<Icon {icon} class={iconClasses} aria-hidden={true} />
