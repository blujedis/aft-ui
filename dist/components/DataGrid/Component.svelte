<script>import { setContext } from "svelte";
import { cleanObj, boolToMapValue, uniqid } from "../../utils";
import { ensureArray, themeStore, themer } from "../../theme";
import { useSelect } from "../../stores/select";
import {
  gridDefaults as defaults
} from "./module";
export let {
  autocols,
  columns,
  divided,
  filters,
  filter: initFilter,
  focused,
  full,
  reorderable,
  resizeable,
  rows,
  rounded,
  rowkey,
  shadowed,
  size,
  sortable,
  sorter,
  sticky,
  stacked,
  striped,
  theme,
  transitioned,
  onBeforeRemove
} = {
  ...cleanObj($themeStore.defaults?.component),
  ...defaults
};
let datagrid = void 0;
export const store = useSelect({
  datagrid,
  mode: "multiple",
  filters: [],
  // applied filters
  sort: [],
  // applied sort.
  rows: [],
  // source rows.
  selected: [],
  // selected rows.
  filtered: [],
  // current filtered rows.
  columns: normalizeColumns(columns)
});
const globals = {
  autocols,
  columns,
  divided,
  filters,
  focused,
  full,
  reorderable,
  resizeable,
  rounded,
  rowkey,
  shadowed,
  size,
  sortable,
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
  gridClasses = th.create("DataGrid").option("elementDivide", theme, divided).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("elementBorder", theme, divided).option("fieldFontSizes", size, size).prepend(`datagrid`, true).append("w-full", full).append("border", divided).append("relative", sticky).append("w-full", !stacked).append("max-w-screen-md m-auto", stacked).append("flow-root overflow-clip", true).append($$restProps.class, true).compile();
function getDataGridTemplate(cols) {
  cols = cols || $store.columns;
  const values = cols.map((c) => c.width);
  return values.join(" ") + "";
}
function normalizeColumns(cols) {
  const foundKeys = [];
  const normalized = cols.map((c) => {
    c.label = c.label || c.accessor;
    c.id = c.id || uniqid();
    c.width = c.width || "1fr";
    c.transform = c.transform || ((v) => v);
    let curKey = c.rowkey;
    if (typeof curKey === "undefined" && rowkey === c.accessor)
      curKey = rowkey;
    if (typeof curKey !== "undefined" && !foundKeys.includes(curKey))
      foundKeys.push(curKey);
    if (typeof c.reorderable === "undefined" && reorderable)
      c.reorderable = true;
    if (typeof c.resizeable === "undefined" && resizeable)
      c.resizeable = true;
    if (typeof c.sortable === "undefined" && sortable)
      c.sortable = true;
    return c;
  });
  rowkey = foundKeys[0];
  return normalized;
}
function updateColumn(accessor, config, done) {
  const index = $store.columns.findIndex((c) => c.accessor == accessor);
  store.update((s) => {
    let columns2 = [...s.columns];
    columns2[index] = { ...columns2[index], ...config };
    columns2 = normalizeColumns(columns2);
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
function getSortToken(accessor) {
  const token = $store.sort.filter((k) => [accessor, `-${accessor}`].includes(k));
  if (!token[0])
    return 0;
  return token[0].charAt(0) === "-" ? -1 : 1;
}
async function resolveFilter(criteria) {
  return Promise.resolve(initFilter(criteria, $store.rows, $store.columns));
}
async function sortby(accessors, reset2 = false) {
  const _accessors = ensureArray(accessors).filter((v) => typeof v !== "undefined" && v !== "");
  if (!_accessors.length)
    reset2 = true;
  const filtered = await resolveFilter($store.filters);
  if (reset2) {
    store.update((s) => {
      return { ...s, filtered: [...filtered], sort: [] };
    });
  } else {
    const sort = _accessors;
    Promise.resolve(sorter(filtered, sort)).then((sorted) => {
      store.update((s) => {
        return { ...s, filtered: [...sorted], sort };
      });
    }).catch((ex) => console.warn(ex.message));
  }
}
async function filter(...criteria) {
  try {
    const filtered = await resolveFilter(criteria);
    store.update((s) => {
      return { ...s, filtered, filters: criteria };
    });
  } catch (ex) {
    const err = ex;
    console.warn(err.message);
  }
}
function reset() {
  store.update((s) => {
    return { ...s, filtered: [...s.rows], sort: [], selected: [] };
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
  return { ...s, rows: [...rows], filtered: [...rows] };
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

<slot name="pager" />
