<script>import { getContext } from "svelte";
import { gridCellDefaults as defaults } from "./module";
import themeStore, { pickCleanProps, themer } from "../..";
const context = getContext("DataGrid");
export let { accessor, size, stacked, theme, variant } = {
  ...defaults,
  ...pickCleanProps(context?.globals, "size", "stacked", "theme", "variant")
};
$:
  gridCellClasses = themer($themeStore).create("DataGridCell").option("fieldPadding", size, size).prepend("datagrid__cell", true).append($$restProps.class, true).compile(true);
</script>

<div {...$$restProps} class={gridCellClasses}>
	<slot />
</div>
