<script>import { usePopover } from "../../hooks";
import { gridFilterCellDefaults as defaults } from "./module";
import { themeStore, themer } from "../../theme";
import { getContext } from "svelte";
import { DataGridCell } from "../DataGridCell";
import { debounce } from "../../utils";
import FilterPopover from "./FilterPopover.svelte";
import { Disclosure } from "..";
const context = getContext("DataGrid");
export let { column, focused, size, stacked, theme } = {
  ...defaults,
  size: context.globals?.size,
  stacked: context.globals?.stacked,
  theme: context.globals?.theme
};
$:
  queryByOne = "=";
$:
  queryValueOne = "";
$:
  queryByTwo = "=";
$:
  queryValueTwo = "";
$:
  queryAndOr = "and";
const th = themer($themeStore);
const [trigger, content] = usePopover({
  offset: 0
});
$:
  gridFilterCellClasses = th.create("DataGridFilterInputWrapper").prepend("datagrid-filter-cell", true).append("relative px-0 py-0 flex items-center", true).compile();
$:
  gridFilterInputClasses = th.create("DataGridFilterInput").option("fieldPadding", size, size).option("common", "focusedOutlineVisible", focused).option("outlineFocusVisible", theme, focused).prepend("datagrid-filter-input", true).append("outline-none bg-transparent relative w-full pr-8", true).compile();
function handleFilter(value, accessor) {
  if (!accessor)
    return;
  debounce(() => {
    context.filter(value, accessor);
  })();
}
</script>

{#if !stacked}
	<DataGridCell class={gridFilterCellClasses}>
		{#if column.filterable}
			<slot>
				<input
					type="text"
					placeholder="filter"
					class={gridFilterInputClasses}
					bind:value={queryValueOne}
					on:input={(e) => handleFilter(e.currentTarget?.value, column.accessor)}
				/>
			</slot>
			<slot name="icon">
				<Disclosure
					as="div"
					escapable
					autoclose
					class="absolute right-0 mr-2 flex items-center"
					let:toggle
					let:visible
				>
					<button use:trigger on:click={toggle} class="outline-none">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M15 19.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L9.29 16.7a.989.989 0 0 1-.29-.83v-5.12L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L15 10.75zM7.04 5L11 10.06v5.52l2 2v-7.53L16.96 5z"
							/></svg
						>
					</button>

					<div use:content class:invisible={!visible}>
						<FilterPopover bind:queryValueOne bind:queryAndOr />
					</div>
				</Disclosure>
			</slot>
		{/if}
	</DataGridCell>
{/if}
