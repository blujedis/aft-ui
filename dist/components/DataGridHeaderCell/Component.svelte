<script>import { getContext } from "svelte";
import { gridHeaderCellDefaults as defaults } from "./module";
import themeStore, { pickCleanProps, themer } from "../..";
const context = getContext("DataGrid");
$:
  sortkey = $context?.sort.find((v) => [accessor, "-" + accessor].includes(v));
$:
  sortdir = typeof sortkey === "undefined" ? 0 : sortkey.charAt(0) === "-" ? -1 : 1;
export let { accessor, size, stacked, theme, variant } = {
  ...defaults,
  ...pickCleanProps(context?.globals, "size", "stacked", "theme", "variant")
};
$:
  gridHeaderCellClasses = themer($themeStore).create("DataGridHeaderCell").option("gridHeaderPadding", size, size).prepend("datagrid__header_cell datagrid__cell", true).append($$restProps.class, true).compile(true);
function sort() {
  const key = sortdir === 0 ? accessor : "-" + accessor;
  context.sortby(key);
}
</script>

<div {...$$restProps} class={gridHeaderCellClasses}>
	<slot {sort} {sortdir} />
</div>
