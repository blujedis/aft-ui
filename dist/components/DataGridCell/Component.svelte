<script>import { getContext } from "svelte";
import { gridCellDefaults as defaults } from "./module";
import {} from "../DataGrid";
import { themeStore, themer } from "../../theme";
const context = getContext("DataGrid");
export let { accessor, full, size, theme } = {
  ...defaults,
  size: context.globals?.size,
  theme: context.globals?.theme
};
$:
  gridCellClasses = themer($themeStore).create("DataGridCell").option("fieldPadding", size, size).prepend("datagrid-cell", true).append("col-span-full", full).append($$restProps.class, true).compile();
</script>

<div role="gridcell" {...$$restProps} class={gridCellClasses}>
	<slot />
</div>
