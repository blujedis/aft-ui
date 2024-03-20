<script>import { gridHeaderDefaults as defaults } from "./module";
import { themeStore, styler, themer } from "../../theme";
import { getContext } from "svelte";
import { useResizer } from "../../hooks";
const context = getContext("DataGrid");
export let { autocols, divided, focused, rounded, size, stacked, sticky, theme, onAfterResize } = {
  ...defaults,
  autocols: context.globals?.autocols,
  divided: context.globals?.divided,
  focused: context.globals?.focused,
  rounded: context.globals?.rounded,
  size: context.globals?.size,
  stacked: context.globals?.stacked,
  sticky: context.globals?.sticky,
  theme: context.globals?.theme
};
const st = styler($themeStore);
const th = themer($themeStore);
$:
  gridHeaderWrapperClasses = th.create("DataGridHeaderWrapper").option("common", "bordered", divided).option("common", "divided", divided).prepend("datagrid-header", true).append("divide-y", divided).append("sticky top-0 z-10 overflow-clip", sticky).append("rounded-b-none", rounded).append("shadow-sm", sticky).append("!border-b-0", !sticky).compile();
function init(node) {
  if (stacked)
    return;
  const header = node.children[0];
  if (!header)
    return;
  const cells = Array.from(header.children);
  for (const [i, c] of cells.entries()) {
    const col = $context.columns[i];
    if (i >= cells.length - 1 || !col.resizeable)
      continue;
    const [resizer] = useResizer({
      onResizing: ({ newWidth }) => {
        context.updateColumn(col.accessor, { width: newWidth + "px" });
      },
      onResized: onAfterResize,
      handles: {
        right: true
      },
      debug: false
    });
    resizer(c);
  }
}
</script>

{#if $$slots.default && !stacked}
	<div use:init class={gridHeaderWrapperClasses}>
		<slot />
	</div>
{/if}
