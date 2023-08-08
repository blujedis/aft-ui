<script>import { gridBodyDefaults as defaults } from "./module";
import themeStore, { pickCleanProps, styler, themer } from "../..";
import { getContext } from "svelte";
const context = getContext("DataGrid");
export let { autocols, columns, divided, size, striped, stacked, theme, variant } = {
  ...defaults,
  ...pickCleanProps(
    context?.globals,
    "autocols",
    "columns",
    "divided",
    "size",
    "stacked",
    "striped",
    "theme",
    "variant"
  )
};
const th = themer($themeStore);
$:
  gridBodyClasses = th.create("DataGridBody").option("common", "divided", divided).prepend("datagrid__body overflow-y-auto", true).append("divide-y", divided).append($$restProps.class, true).compile(true);
</script>

<div {...$$restProps} class={gridBodyClasses}>
	<slot />
</div>
