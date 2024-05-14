<script>import { themeStore, themer } from "../../theme";
import { createCustomEvent } from "../../utils";
import { setContext } from "svelte";
import {
  disclosureDefaults as defaults
} from "./module";
import { useDisclosure } from "../../stores";
export let {
  as,
  autoclose,
  escapable,
  focustrap,
  opened,
  store: initStore,
  transition
} = { ...defaults };
const element = as;
export const store = useDisclosure({ visible: opened });
setContext("Disclosure", {
  ...store,
  focustrap,
  transition,
  open: handleOpen,
  close: handleClose,
  toggle: handleToggle
});
const th = themer($themeStore);
$:
  disclosureClasses = th.create("Disclosure").prepend("disclosure", true).append($$restProps.class, true).compile();
const clickOutside = createCustomEvent("click", "click_outside", (e, n) => {
  return n && !n.contains(e.target) && !e.defaultPrevented && autoclose && $store.visible || false;
});
function handleOpen() {
  store.open();
  setTimeout(() => {
    $store.panel?.focus();
  });
}
function handleClose() {
  store.close();
}
function handleToggle() {
  if ($store.visible) {
    handleClose();
  } else {
    handleOpen();
  }
}
function handleKeydown(e) {
  if (!$store.visible || e.repeat)
    return;
  const target = e.target;
  if (e.key === "Escape" && escapable && (target.matches("body") || target === $store.panel)) {
    e.preventDefault();
    store.close();
  }
}
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:element
	this={element}
	role="presentation"
	{...$$restProps}
	use:clickOutside
	on:click_outside={handleClose}
	class={disclosureClasses}
>
	<slot open={handleOpen} close={handleClose} toggle={handleToggle} visible={$store?.visible} />
</svelte:element>
