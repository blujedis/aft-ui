<script>import { getContext } from "svelte";
import { gridCellDefaults as defaults } from "./module";
import {} from "../DataGrid";
import { themeStore, themer } from "../../theme";
const context = getContext("DataGrid");
export let { accessor, full, size, stacked, theme } = {
  ...defaults,
  size: context.globals?.size,
  stacked: context.globals?.stacked,
  theme: context.globals?.theme
};
$:
  gridCellClasses = themer($themeStore).create("DataGridCell").option("fieldPadding", size, size).prepend("datagrid-cell", true).append("col-span-full", full).append("py-0.5", stacked).append($$restProps.class, true).compile();
</script>

<div role="gridcell" {...$$restProps} class={gridCellClasses}>
	<slot />
</div>
