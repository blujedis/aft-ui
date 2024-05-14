<script>import { gridBodyDefaults as defaults } from "./module";
import { themeStore, pickCleanProps, styler, themer } from "../..";
import { getContext } from "svelte";
const context = getContext("DataGrid");
export let { autocols, columns, divided, size, striped, stacked, theme } = {
  ...defaults,
  autocols: context.globals?.autocols,
  columns: context.globals?.columns,
  divided: context.globals?.divided,
  size: context.globals?.size,
  stacked: context.globals?.stacked,
  striped: context.globals?.striped,
  theme: context.globals?.theme
};
const th = themer($themeStore);
$:
  gridBodyClasses = th.create("DataGridBody").option("elementDivide", theme, divided).prepend("datagrid-body overflow-y-auto", true).append("divide-y", divided).append($$restProps.class, true).compile();
</script>

<div {...$$restProps} class={gridBodyClasses}>
	<slot />
</div>
