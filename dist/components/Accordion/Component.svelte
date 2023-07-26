<script>import { cleanObj } from "../../utils";
import {
  accordionDefaults as defaults
} from "./module";
import themeStore, { themer } from "../..";
import { useSelect } from "../../stores/select";
import { setContext } from "svelte";
export let { as, multiple, selected, rounded, shadowed, size, theme, transition, variant } = {
  ...defaults
};
export const store = useSelect({ multiple, selected });
const globals = cleanObj({
  rounded: variant === "pills" ? rounded : "none",
  shadowed,
  size,
  theme,
  transition,
  variant
});
setContext("Accordion", {
  ...store,
  globals
});
const th = themer($themeStore);
if (rounded === "full" && variant !== "pills")
  console.warn(`Rounded downgraded to "xl2", full not supported by variant "${variant}".`);
$:
  accordionClasses = th.create("Accordion").variant("accordion", variant, theme, true).option("roundeds", rounded === "full" && variant !== "pills" ? "xl2" : rounded, rounded).option("shadows", shadowed, shadowed && variant !== "pills").append($$restProps.class, true).compile(true);
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
