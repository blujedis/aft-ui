<script>import { gridRowDefaults as defaults } from "./module";
import { themeStore, styler, themer } from "../../theme";
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
const st = styler($themeStore);
$: gridRowStyles = st.create("DataGridRow").add("--template-columns", context.getDataGridTemplate(), autocols).append($$restProps.style, true).compile();
$: gridRowClasses = themer($themeStore).create("DataGridRow").option("elementDivide", theme, divided).prepend("datagrid-row", true).append("divide-x", divided).append("grid grid-flow-col w-full", !stacked).append(stacked ? "auto-rows-fr py-1.5" : "auto-cols-fr", autocols).append($$restProps.class, true).compile();
</script>

{#if $$slots.default}
	<div role="row" {...$$restProps} class={gridRowClasses} style={gridRowStyles}>
		<slot />
	</div>
{/if}

<style>
	.datagrid-row {
		grid-template-columns: var(--template-columns);
	}
</style>
