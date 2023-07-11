<script>import { tabPanelDefaults as defaults } from "./module";
import themeStore, { themer } from "../..";
import { getContext } from "svelte";
export let { unmount, value } = {
  ...defaults
};
const context = getContext("TabController");
$:
  visible = $context?.selected?.includes(value);
$:
  tabPanelStyles = $context.visible ? $$restProps.style : !unmount ? "display:none;" : $$restProps.style;
$:
  tabPanelClasses = themer($themeStore).create("TabPanel").append($$restProps.class, true).compile(true);
</script>

{#if (unmount && visible) || !unmount}
	<div {...$$restProps} class={tabPanelClasses} style={tabPanelStyles}>
		<slot />
	</div>
{/if}
