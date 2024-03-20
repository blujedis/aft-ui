<script>import usePaginator, { getPaginator } from "../../stores/paginator";
import { paginationDefaults as defaults } from "./module";
import { themer, themeStore } from "../../theme";
import { get_current_component } from "svelte/internal";
import { setContext } from "svelte";
import { cleanObj, forwardEventsBuilder, boolToMapValue } from "../../utils";
export let {
  ellipsis,
  focused,
  hovered,
  items,
  page,
  pages,
  pageSize,
  rounded,
  shadowed,
  size,
  theme,
  transitioned,
  variant
} = {
  ...defaults
};
const pg = usePaginator({
  page,
  pages,
  pageSize,
  ellipsis,
  items
});
const globals = cleanObj({
  focused,
  hovered,
  rounded,
  // shadowed,
  size,
  theme,
  transitioned,
  variant
});
export const context = setContext("Pagination", {
  ...pg,
  globals
});
const th = themer($themeStore);
$:
  paginationControllerClasses = th.create("PagerControllerNav").option("common", "transitioned", transitioned).option("roundeds", boolToMapValue(rounded), rounded).option("shadows", boolToMapValue(shadowed), shadowed).option("common", "ringed", ["filled", "soft"].includes(variant)).option("common", "divided", ["filled", "soft"].includes(variant)).option("common", "bordered", variant === "flushed").append("inline-flex items-center", ["filled", "soft"].includes(variant)).append("isolate inline-flex -space-x-px", ["filled", "soft"].includes(variant)).append("divide-x ring-1 ring-inset", ["filled", "soft"].includes(variant)).append("border-t isolate inline-flex", variant === "flushed").append($$restProps.class, true).compile();
const forwardedEvents = forwardEventsBuilder(get_current_component());
</script>

<nav
	use:forwardedEvents
	aria-label="Pagination"
	{...$$restProps}
	class={paginationControllerClasses}
>
	<slot
		page={$pg.page}
		startPage={$pg.startPage}
		endPage={$pg.endPage}
		rangeStart={$pg.startRecord}
		rangeEnd={$pg.endRecord}
		activePages={$pg.activePages}
		totalPages={$pg.totalPages}
	/>
</nav>
