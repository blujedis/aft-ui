<script>import {
  buttonGroupDefaults as defaults
} from "./module";
import themeStore, { themer } from "../..";
import { setContext } from "svelte";
import { useSelect } from "../../stores/select";
import { ensureArray } from "../../utils";
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
  underlined,
  variant
} = {
  ...defaults
};
export const store = useSelect({ selected: ensureArray(selected), multiple });
setContext("ButtonGroup", {
  ...store,
  globals: {
    focused,
    full,
    rounded,
    size,
    theme,
    transitioned,
    underlined,
    variant
  }
});
$:
  buttonGroupClasses = themer($themeStore).create("ButtonGroup").option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).append("w-full", full).append("isolate inline-flex[&>:not(:first-child):not(:last-child)]:rounded-none", true).append($$restProps.class, true).compile(true);
</script>

<span role="list" class={buttonGroupClasses}>
	<slot
		selectedItems={$store.selected}
		reset={store.reset}
		select={store.select}
		unselect={store.unselect}
		isSelected={store.isSelected}
	/>
</span>
