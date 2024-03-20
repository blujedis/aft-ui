<script>import { createCustomEvent } from "../../utils";
import { setContext } from "svelte";
import {
  disclosureDefaults as defaults
} from "./module";
import { useDisclosure } from "../../stores";
export let {
  as,
  autoclose,
  escapable,
  opened,
  store: initStore,
  transition
} = { ...defaults };
let disclosure;
const element = as;
export const store = useDisclosure({ visible: opened });
setContext("Disclosure", {
  ...store,
  transition
});
const clickOutside = createCustomEvent("click", "click_outside", (e, n) => {
  return n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible || false;
});
function handleOpen() {
  store.open();
  setTimeout(() => {
    disclosure?.focus();
  });
}
function handleClose() {
  store.close();
}
function handleToggle() {
  if ($store.visible)
    handleClose();
  else
    handleOpen();
}
function handleKeydown(e) {
  if (!$store.visible || e.repeat)
    return;
  const target = e.target;
  if (e.key === "Escape" && escapable && (target.matches("body") || target === disclosure)) {
    e.preventDefault();
    store.close();
  }
}
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:element
	this={element}
	tabindex="-1"
	role="presentation"
	{...$$restProps}
	bind:this={disclosure}
	use:clickOutside
	on:click_outside={handleClose}
>
	<slot open={handleOpen} close={handleClose} toggle={handleToggle} visible={$store?.visible} />
</svelte:element>
