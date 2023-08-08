<script>import { cleanObj } from "../../utils";
import { setContext } from "svelte";
import themeStore, { themer, useSelect } from "../..";
import {
  gridDefaults as defaults
} from "./module";
export let {
  autocols,
  columns,
  divided,
  filter: initFilter,
  focused,
  full,
  items,
  rounded,
  rowkey,
  shadowed,
  size,
  sorter,
  sticky,
  stacked,
  striped,
  theme,
  transitioned,
  variant,
  onBeforeRemove
} = {
  ...defaults
};
let grid = void 0;
export const store = useSelect({
  grid,
  sort: [],
  selected: [],
  filtered: [],
  items: [],
  columns: normalizeColumns(columns)
});
const globals = {
  autocols,
  columns,
  divided,
  focused,
  full,
  rounded,
  rowkey,
  shadowed,
  size,
  sticky,
  stacked,
  striped,
  theme,
  transitioned,
  variant
};
export const api = {
  sortby,
  filter,
  reset,
  remove,
  getDataGridTemplate,
  getSortToken
};
setContext("DataGrid", {
  ...store,
  ...api,
  globals: cleanObj(globals)
});
const th = themer($themeStore);
$:
  gridClasses = th.create("DataGrid").variant("grid", variant, theme, true).option("roundeds", rounded, rounded).option("shadows", shadowed, shadowed).option("common", "divided", divided).option("common", "ringed", divided).option("fieldFontSizes", size, size).prepend("datagrid overflow-clip flow-root", true).append("divide-y", divided).append("w-full", full).append("relative", sticky).append($$restProps.class, true).compile(true);
async function remove(key) {
  const item = $store.items.find((item2) => item2[rowkey] === key);
  const shouldRemove = await Promise.resolve(onBeforeRemove(item));
  if (!shouldRemove)
    return;
  store.update((s) => {
    const newItems = s.items.filter((item2) => item2[rowkey] !== key);
    const newFiltered = s.filtered.filter((item2) => item2[rowkey] !== key);
    return { ...s, items: newItems, filtered: newFiltered };
  });
}
function updateSort(stored, accessors) {
  let clone = [...accessors];
  const shouldPurge = accessors.filter((a) => a.charAt(0) === "-" && stored.includes(a));
  stored.forEach((s) => {
    if (!clone.includes(s) && !clone.includes("-" + s))
      clone.unshift(s);
  });
  clone = clone.filter((c) => !shouldPurge.includes(c) && !!c);
  return [...clone];
}
function sortby(...accessors) {
  const nextSort = updateSort($store.sort, accessors);
  Promise.resolve(sorter($store.filtered, nextSort)).then((filtered) => store.update((s) => ({ ...s, filtered, sort: nextSort }))).catch((ex) => console.warn(ex.message));
}
function getSortToken(accessor) {
  const token = $store.sort.filter((k) => [accessor, `-${accessor}`].includes(k));
  if (!token[0])
    return 0;
  return token[0].charAt(0) === "-" ? -1 : 1;
}
function filter(query, ...accessors) {
  Promise.resolve(initFilter(query, $store.items, ...accessors)).then((filtered) => {
    store.update((s) => {
      return { ...s, filtered };
    });
  }).catch((ex) => console.warn(ex.message));
}
function reset() {
  store.update((s) => {
    return { ...s, filtered: [...s.items], sort: [] };
  });
}
function getDataGridTemplate(name = "cols", cols = $store.columns) {
  const values = cols.map((c) => c.width);
  return values.join(" ") + "";
}
function normalizeColumns(cols) {
  return cols.map((c) => {
    c.label = c.label || c.accessor;
    return c;
  });
}
Promise.resolve(items).then((i) => {
  store.update((s) => {
    return { ...s, items: i.sort(), filtered: [...i] };
  });
});
</script>

<div bind:this={grid} {...$$restProps} class={gridClasses}>
	<slot rows={$store.filtered} columns={$store.columns} {remove} {filter} {reset} {sortby} />
</div>
