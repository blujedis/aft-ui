<script>import { menuDefaults as defaults } from "./module";
import themeStore, { themer, useDisclosure } from "../..";
import { onMount, setContext } from "svelte";
import { cleanObj, createCustomEvent } from "../../utils";
export let {
  autoclose,
  escapable,
  full,
  rounded,
  shadowed,
  size,
  store: initStore,
  strategy,
  theme,
  underlined,
  variant,
  visible
} = {
  ...defaults
};
export const store = initStore || useDisclosure({
  visible
});
const th = themer($themeStore);
let div;
let mounted = false;
const globals = cleanObj({
  full,
  strategy,
  rounded,
  shadowed,
  size,
  theme,
  underlined,
  variant
});
setContext("Menu", {
  ...store,
  globals
});
$:
  menuClasses = th.create("Menu").append("w-full", full).append("relative inline-block clear-both", true).append($$restProps.class, true).compile(true);
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
onMount(() => {
  mounted = true;
});
</script>

<div
	role="none"
	bind:this={div}
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	on:keydown={handleKeydown}
	class={menuClasses}
	class:invisible={!mounted}
>
	<slot
		visible={$store.visible}
		active={$store.active}
		open={store.open}
		close={store.close}
		toggle={store.toggle}
	/>
</div>
