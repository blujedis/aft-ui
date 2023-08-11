<script>import { themeStore, themer } from "../..";
import { Icon } from "../Icon";
import { loaderDefaults as defaults } from "./module";
export let { icon, visible, size } = { ...defaults };
const th = themer($themeStore);
$:
  loaderClasses = th.create("Loader").option("iconSizes", size, true).append("animate-spin text-inherit", true).compile();
</script>

{#if visible}
	<Icon {...$$restProps} {icon} class={loaderClasses} />
{/if}
