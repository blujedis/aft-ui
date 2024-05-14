<script>import { menuDefaults as defaults } from "./module";
import { themeStore, themer } from "../../theme";
import { useDisclosure } from "../../stores";
import { setContext } from "svelte";
import { cleanObj, createCustomEvent } from "../../utils";
export let {
  autoclose,
  escapable,
  disabled,
  full,
  focused,
  hovered,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  underlined,
  variant,
  visible
} = {
  ...cleanObj($themeStore.defaults?.component),
  ...defaults
};
export const store = useDisclosure({
  visible
});
const th = themer($themeStore);
let div;
const globals = cleanObj({
  disabled,
  full,
  focused,
  hovered,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  underlined,
  variant
});
setContext("Menu", {
  ...store,
  globals
});
$:
  menuClasses = th.create("Menu").append("w-full", full).prepend(`menu menu-${variant} menu-${theme}`, true).append("relative inline-block clear-both", true).append($$restProps.class, true).compile();
const clickOutside = createCustomEvent("click", "click_outside", (e, n) => {
  return n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible || false;
});
function handleClose(e) {
  store.close();
}
function handleKeydown(e) {
  if (e.key === "Escape" && escapable || e.key === "Tab" && $store.visible)
    return store.close();
  if (!$store.visible && e.key === "ArrowDown")
    return store.open();
}
</script>

<div
	role="none"
	bind:this={div}
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	on:keydown={handleKeydown}
	class={menuClasses}
>
	<slot visible={$store.visible} open={store.open} close={store.close} toggle={store.toggle} />
</div>
