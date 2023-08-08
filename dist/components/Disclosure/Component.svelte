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
const element = as;
export const store = initStore || useDisclosure({ visible: opened });
setContext("Disclosure", {
  ...store,
  transition
});
const clickOutside = createCustomEvent("click", "click_outside", (e, n) => {
  return n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible || false;
});
function handleClose(e) {
  store.close();
}
function handleKeydown(e) {
  if (!e.repeat && e.key === "Escape" && escapable) {
    store.close();
  }
}
</script>

<svelte:element
	this={element}
	role="presentation"
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	on:keydown={handleKeydown}
>
	<slot open={store?.open} close={store?.close} toggle={store?.toggle} visible={$store?.visible} />
</svelte:element>
