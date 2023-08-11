<script>import { iconDefaults as defaults } from "./module";
import IconBase from "@iconify/svelte";
import { themeStore, themer } from "../..";
export let { icon, size, unstyled } = { ...defaults };
const Icon = IconBase;
const th = themer($themeStore);
$:
  iconClasses = unstyled ? $$restProps.class : th.create("Icon").option("iconSizes", size, size).append($$restProps.class, true).compile(true);
</script>

<Icon {...$$restProps} {icon} class={iconClasses} aria-hidden={true} />
