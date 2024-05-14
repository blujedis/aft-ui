<script>import { uniqid } from "../../utils";
import { flip } from "svelte/animate";
import { getContext } from "svelte";
import { gridHeaderCellDefaults as defaults } from "./module";
import { themeStore, themer } from "../../theme";
const context = getContext("DataGrid");
const id = uniqid();
let dragging = false;
let focusing = false;
export let { accessor, focused, size, theme } = {
  ...defaults,
  focused: context.globals?.focused,
  size: context.globals?.size,
  theme: context.globals?.theme
};
const th = themer($themeStore);
$:
  config = $context.columns.find((v) => v.accessor === accessor);
$:
  sortkey = $context?.sort.find((v) => [accessor, "-" + accessor].includes(v));
$:
  sortdir = typeof sortkey === "undefined" ? 0 : sortkey.charAt(0) === "-" ? -1 : 1;
$:
  isLast = $context.columns.findIndex((c) => c.accessor === accessor) === $context.columns.length - 1;
$:
  gridHeaderCellClasses = th.create("DataGridHeaderCell").option("gridHeaderPadding", size, size).option("common", "focusedRingWithin", focused && !dragging).option("ringFocusWithin", theme, focused).prepend("datagrid-cell datagrid-header-cell", true).append("group-hover:cursor-move", config.reorderable).append(
    "group-[.dragging]:bg-primary-500/70 group-[.dragging]:text-white dark:group-[.dragging]:bg-primary-800/80",
    config.reorderable
  ).append("select-none outline-none focus-within:ring-offset-0 focus-within:ring-inset", true).append($$restProps.class, true).compile();
$:
  dividerClasses = th.create("DataGridHeaderCellDivider").option("dividerBg", theme, theme).prepend("datagrid-header-cell-divider", true).append("w-0.5 h-1/2 absolute z-10 top-1/4 -right-[1.5px]", true).compile();
function sort() {
  const key = sortdir === 0 ? accessor : sortdir === 1 ? "-" + accessor : "";
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

<div class="datagrid-header-cell-wrapper relative group pl-1 pr-0.5" class:dragging>
	{#if config.reorderable}
		<div
			role="columnheader"
			{id}
			tabindex="0"
			{...$$restProps}
			aria-grabbed={dragging}
			class={gridHeaderCellClasses}
			draggable={config.reorderable}
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
