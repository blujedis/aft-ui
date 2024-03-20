<script>import { writable } from "svelte/store";
import { uniqid } from "../../utils";
import { getContext } from "svelte";
import { gridHeaderCellDefaults as defaults } from "./module";
import { themeStore, themer } from "../../theme";
const context = getContext("DataGrid");
const id = uniqid();
let dragging = false;
let focusing = false;
export let { accessor, draggable, focused, size, stacked, theme } = {
  ...defaults,
  focused: context.globals?.focused,
  size: context.globals?.size,
  stacked: context.globals?.stacked,
  theme: context.globals?.theme,
  draggable: true
};
const th = themer($themeStore);
$:
  sortkey = $context?.sort.find((v) => [accessor, "-" + accessor].includes(v));
$:
  sortdir = typeof sortkey === "undefined" ? 0 : sortkey.charAt(0) === "-" ? -1 : 1;
$:
  isLast = $context.columns.findIndex((c) => c.accessor === accessor) === $context.columns.length - 1;
$:
  gridHeaderCellClasses = th.create("DataGridHeaderCell").option("gridHeaderPadding", size, size).option("common", "focusedRingWithin", focused && !dragging).option("ringFocusWithin", theme, focused).prepend("datagrid-cell datagrid-header-cell", true).append("group-[.dragging]:bg-secondary peer", true).append("select-none focus:ring-inset", true).append($$restProps.class, true).compile();
$:
  dividerClasses = th.create("DataGridHeaderCellDivider").option("panelBg", theme, theme).prepend("datagrid-header-cell-divider", true).append("w-0.5 h-1/2 absolute z-0 top-1/4 -right-0.5", true).compile();
function sort() {
  const key = sortdir === 0 ? accessor : "-" + accessor;
  context.sortby(key);
}
function getHeaderChildren(child) {
  const children = child.closest(".datagrid-row")?.children;
  if (!children)
    return null;
  return Array.from(children);
}
function getIndex(el) {
  const children = getHeaderChildren(el);
  if (!children || !children.length)
    return null;
  const nodes = Array.from(children);
  let index = null;
  nodes.forEach((n, i) => {
    if (n.contains(el))
      index = i;
  });
  return index;
}
function onDragStart(event) {
  if (!event.dataTransfer) {
    console.warn(`Column reorder on DRAG START failed, invalid target.`);
    return;
  }
  const index = getIndex(event.target);
  if (index === null) {
    console.warn(`Column reorder failed, cannot find index.`);
    return;
  }
  event.dataTransfer.setData("text/plain", index + "");
  dragging = true;
}
function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
  dragging = false;
  if (!event.dataTransfer || !event.target) {
    console.warn(`Column reorder on DROP failed, invalid target.`);
    return;
  }
  const target = event.target;
  const sourceIndex = Number(event.dataTransfer.getData("text"));
  const targetIndex = getIndex(event.target);
  if (targetIndex === null) {
    console.warn(`Column reorder event DROP failed, unknown target index.`);
    return;
  }
  event.dataTransfer.clearData();
  context.swapColumns(sourceIndex, targetIndex);
  target.focus();
}
</script>

<div class="relative group" class:dragging>
	{#if draggable}
		<div
			role="columnheader"
			{id}
			tabindex="-1"
			{...$$restProps}
			aria-grabbed={dragging}
			class={gridHeaderCellClasses}
			{draggable}
			on:dragstart={onDragStart}
			on:dragover={onDragOver}
			on:drop={onDrop}
			on:dragend={() => (dragging = false)}
			on:focusin={() => (focusing = true)}
			on:focusout={() => (focusing = false)}
		>
			<slot {sort} {sortdir} />
		</div>
	{:else}
		<div role="columnheader" {id} {...$$restProps} class={gridHeaderCellClasses}>
			<slot {sort} {sortdir} />
		</div>
	{/if}
	{#if !dragging && !isLast}
		<div class={dividerClasses} class:hidden={focusing}></div>
	{/if}
</div>
