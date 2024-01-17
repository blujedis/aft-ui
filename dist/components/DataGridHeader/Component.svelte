<script>import { gridHeaderDefaults as defaults } from "./module";
import { themeStore, pickCleanProps, styler, themer } from "../..";
import { getContext } from "svelte";
const context = getContext("DataGrid");
export let { autocols, columns, divided, focused, rounded, size, sticky, theme, variant } = {
  ...defaults,
  ...pickCleanProps(
    context?.globals,
    "autocols",
    "columns",
    "divided",
    "focused",
    "rounded",
    "size",
    "sticky",
    "theme",
    "variant"
  )
};
const st = styler($themeStore);
const th = themer($themeStore);
$:
  gridHeaderStyles = st.create("DataGridHeader").add("--template-columns", context.getDataGridTemplate(), autocols).compile();
$:
  gridHeaderWrapperClasses = th.create("DataGridHeaderWrapper").option("common", "divided", divided && $$slots.filter).append("divide-y", divided && $$slots.filter).append("sticky top-0 z-10", sticky).append("rounded-b-none", rounded).prepend("datagrid__header shadow-sm", true).compile(true);
$:
  gridHeaderClasses = th.create("DataGridHeader").variant("gridHeader", variant, theme, variant).append("auto-cols-fr", autocols).prepend("datagrid__header_row grid grid-flow-col w-full", true).append($$restProps.class, true).compile(true);
</script>

<div class={gridHeaderWrapperClasses}>
	<div {...$$restProps} class={gridHeaderClasses} style={gridHeaderStyles}>
		<slot />
	</div>
	<slot name="filter" />
</div>

<style>
	.grid__header {
		grid-template-columns: var(--template-columns);
	}
</style>
