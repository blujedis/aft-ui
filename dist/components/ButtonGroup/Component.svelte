<script>import {
  buttonGroupDefaults as defaults
} from "./module";
import { themeStore, themer } from "../..";
import { onMount, setContext } from "svelte";
import { useSelect } from "../../stores/select";
import { cleanObj, ensureArray } from "../../utils";
export let {
  focused,
  full,
  multiple,
  rounded,
  selected,
  shadowed,
  size,
  theme,
  transitioned,
  variant
} = {
  ...defaults
};
export const store = useSelect({ selected: ensureArray(selected), multiple });
const globals = cleanObj({
  focused,
  full,
  rounded,
  size,
  theme,
  transitioned,
  variant
});
setContext("ButtonGroup", {
  ...store,
  globals
});
$:
  buttonGroupClasses = themer($themeStore).create("ButtonGroup").option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full", full).append("isolate inline-flex[&>:not(:first-child):not(:last-child)]:rounded-none", true).append($$restProps.class, true).compile(true);
function handleReset() {
}
</script>

<span role="list" class={buttonGroupClasses}>
	<slot
		selectedItems={$store.selected}
		reset={handleReset}
		select={store.select}
		unselect={store.unselect}
		isSelected={store.isSelected}
	/>
</span>
