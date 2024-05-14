<script>import {
  buttonGroupDefaults as defaults
} from "./module";
import { themer, themeStore } from "../../theme";
import { setContext } from "svelte";
import { useSelect } from "../../stores/select";
import { cleanObj, ensureArray, boolToMapValue } from "../../utils";
export let {
  focused,
  full,
  hovered,
  multiple,
  rounded,
  value,
  shadowed,
  size,
  theme,
  transitioned,
  variant
} = {
  ...cleanObj($themeStore.defaults?.component),
  ...defaults
};
const store = useSelect({ selected: value, mode: multiple ? "multiple" : "single" });
setContext("ButtonGroup", {
  ...store,
  globals: {
    focused,
    full,
    hovered,
    rounded,
    size,
    theme,
    transitioned,
    variant
  }
});
$:
  buttonGroupClasses = themer($themeStore).create("ButtonGroup").option("shadows", boolToMapValue(shadowed), shadowed).prepend(`button-group button-group-${variant}`, true).append("w-full", full).append("[&>:not(:first-child):not(:last-child)]:rounded-none", variant !== "ghost").append("isolate inline-flex", true).append("space-x-4", variant === "flushed").append("gap-1", ["ghost", "flushed"].includes(variant)).append($$restProps.class, true).compile();
function handleReset() {
  store.reset();
}
</script>

<span role="list" class={buttonGroupClasses}>
	<slot
		selected={$store.selected}
		reset={store.reset}
		select={store.select}
		unselect={store.unselect}
	/>
</span>
