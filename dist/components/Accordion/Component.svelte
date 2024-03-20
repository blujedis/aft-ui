<script>import { cleanObj } from "../../utils";
import {
  accordionDefaults as defaults
} from "./module";
import { themer, themeStore } from "../../theme";
import { useSelect } from "../../stores/select";
import { setContext } from "svelte";
export let {
  as,
  bordered,
  detached,
  focused,
  hovered,
  multiple,
  rounded,
  selected,
  selectable,
  shadowed,
  size,
  theme,
  transition,
  transitioned,
  variant
} = {
  ...$themeStore.defaults?.component,
  ...defaults
};
export const store = useSelect({ multiple, selected });
const globals = cleanObj({
  bordered,
  detached,
  hovered,
  focused,
  rounded,
  selectable,
  shadowed,
  size,
  theme,
  transition,
  transitioned,
  variant
});
setContext("Accordion", {
  ...store,
  globals
});
const th = themer($themeStore);
if (rounded === "full")
  console.warn(`Rounded downgraded to "xl2", full not supported by variant "${variant}".`);
$:
  accordionClasses = th.create("Accordion").option("common", "divided", variant === "filled").append("divide-y", variant === "filled").prepend(`accordion`, true).append($$restProps.class, true).compile();
function handleReset() {
}
</script>

<svelte:element
	this={as}
	{...$$restProps}
	aria-expanded={$store.selected.length > 0}
	class={accordionClasses}
>
	<slot
		select={store.select}
		unselect={store.unselect}
		reset={handleReset}
		isSelected={store.isSelected}
		selectedItems={$store.selected}
	/>
</svelte:element>
