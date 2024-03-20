<script>import { useResizer } from "../../hooks";
import { setContext } from "svelte";
import { cleanObj, boolToMapValue, uniqid } from "../../utils";
import { themeStore, themer } from "../../theme";
import { useSelect } from "../../stores";
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
  rows,
  rounded,
  rowkey,
  shadowed,
  size,
  sortMultiple,
  sorter,
  sticky,
  stacked,
  striped,
  theme,
  transitioned,
  onBeforeRemove
} = {
  ...defaults
};
let datagrid = void 0;
export const store = useSelect({
  datagrid,
  sorting: false,
  sort: [],
  selected: [],
  filtered: [],
  rows: [],
  unsorted: [],
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
  transitioned
};
export const api = {
  sortby,
  filter,
  reset,
  remove,
  getDataGridTemplate,
  getSortToken,
  updateColumn,
  swapColumns
};
setContext("DataGrid", {
  ...store,
  ...api,
  globals: cleanObj(globals)
});
const th = themer($themeStore);
$:
  gridClasses = th.create("DataGrid").option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("common", "divided", divided).option("common", "bordered", divided).option("fieldFontSizes", size, size).prepend(`datagrid`, true).append("divide-y", divided).append("w-full", full).append("relative", sticky).append("border", divided).append("flow-root", true).append($$restProps.class, true).compile();
function getDataGridTemplate(cols) {
  cols = cols || $store.columns;
  const values = cols.map((c) => c.width);
  return values.join(" ") + "";
}
function normalizeColumns(cols) {
  return cols.map((c) => {
    c.label = c.label || c.accessor;
    c.id = c.id || uniqid();
    c.width = c.width || "1fr";
    return c;
  });
}
function updateColumn(accessor, config, done) {
  const index = $store.columns.findIndex((c) => c.accessor == accessor);
  store.update((s) => {
    const columns2 = [...s.columns];
    columns2[index] = { ...columns2[index], ...config };
    if (done)
      done(columns2);
    return { ...s, columns: columns2 };
  });
}
function swapColumns(source, target) {
  const cols = [...$store.columns];
  const sourceCol = cols[source];
  const targetCol = cols[target];
  cols[source] = targetCol;
  cols[target] = sourceCol;
  store.update((s) => {
    return { ...s, columns: cols };
  });
}
function prepareSortArray(stored, accessors) {
  let clone = [...accessors];
  const shouldPurge = accessors.filter((a) => a.charAt(0) === "-" && stored.includes(a));
  stored.forEach((s) => {
    if (!clone.includes(s) && !clone.includes("-" + s))
      clone.unshift(s);
  });
  clone = clone.filter((c) => !shouldPurge.includes(c) && !!c);
  return clone;
}
function getSortToken(accessor) {
  const token = $store.sort.filter((k) => [accessor, `-${accessor}`].includes(k));
  if (!token[0])
    return 0;
  return token[0].charAt(0) === "-" ? -1 : 1;
}
function sortby(...accessors) {
  const nextSort = prepareSortArray(
    sortMultiple ? [...$store.sort] : [$store.sort[0]],
    accessors
  );
  const collection = !nextSort.length ? $store.unsorted : $store.filtered;
  const obj = { sort: nextSort };
  if (!$store.sorting) {
    obj.sorting = true;
    obj.unsorted = [...$store.filtered];
  }
  if (!nextSort.length) {
    obj.sorting = false;
    obj.unsorted = [];
  }
  Promise.resolve(sorter(collection, nextSort)).then(
    (filtered) => store.update((s) => {
      return { ...s, filtered, ...obj };
    })
  ).catch((ex) => console.warn(ex.message));
}
function filter(query, accessor, ...accessors) {
  const _accessors = Array.isArray(accessor) ? accessor : [accessor, ...accessors];
  Promise.resolve(initFilter(query, $store.rows, _accessors)).then((filtered) => {
    store.update((s) => {
      return { ...s, filtered };
    });
  }).catch((ex) => console.warn(ex.message));
}
function reset() {
  store.update((s) => {
    return { ...s, filtered: [...s.rows], sort: [] };
  });
}
async function remove(key) {
  const item = $store.rows.find((item2) => item2[rowkey] === key);
  const shouldRemove = await Promise.resolve(onBeforeRemove(item));
  if (!shouldRemove)
    return;
  store.update((s) => {
    const newItems = s.rows.filter((item2) => item2[rowkey] !== key);
    const newFiltered = s.filtered.filter((item2) => item2[rowkey] !== key);
    return { ...s, rows: newItems, filtered: newFiltered };
  });
}
store.update((s) => {
  return { ...s, rows: [...rows], filtered: [...rows], unsorted: [...rows] };
});
</script>

<div bind:this={datagrid} {...$$restProps} class={gridClasses}>
	<slot
		rows={$store.filtered}
		columns={$store.columns}
		{remove}
		{filter}
		{reset}
		{sortby}
		{stacked}
	/>
</div>
