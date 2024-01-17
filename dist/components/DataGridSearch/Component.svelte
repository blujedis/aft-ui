<script>import { gridSearchDefaults as defaults } from "./module";
import { themeStore, bem, pickCleanProps, themer } from "../..";
import { getContext } from "svelte";
import { DataGridCell } from "../DataGridCell";
import { debounce } from "../../utils";
const context = getContext("DataGrid");
export let { action, focused, method, rounded, size, strategy, theme, variant } = {
  ...defaults,
  ...pickCleanProps(
    context?.globals,
    "autocols",
    "columns",
    "focused",
    "rounded",
    "size",
    "theme",
    "variant"
  )
};
const th = themer($themeStore);
$:
  gridSearchClasses = th.create("DataGridSearch").prepend("datagrid__search", true).compile(true);
$:
  gridSearchInputClasses = th.create("DataGridSearchInput").option("fieldFontSizes", size, size).option("fieldPadding", size, size).option("focusedOutline", typeof focused === "string" ? focused : theme, focused).option("roundeds", rounded, rounded).prepend("datagrid__search_input", true).append("pl-10 focus:outline-none bg-transparent px-4 py-2 w-full rounded-b-none", true).compile();
function handleSearchSubmit(e) {
  if (strategy !== "submit" || method || action)
    return;
  e.preventDefault();
  const form = e.target;
  if (form) {
    debounce(() => {
      const data = new FormData(form);
      context.filter(data.get("search")?.toString() || "");
    })();
  }
}
function handleSearchInput(e) {
  e.preventDefault();
  const input = e.target;
  if (input)
    debounce(() => {
      context.filter(input.value || "");
    })();
}
</script>

<DataGridCell size="unstyled" class={gridSearchClasses} full>
	<slot search={context.filter}>
		<form id="search_form" name="search_form" {action} {method} on:submit={handleSearchSubmit}>
			<div class="flex items-center">
				<div class="flex-1 relative p-1">
					<svg
						class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-frame-400 ml-4"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
							clip-rule="evenodd"
						/>
					</svg>
					{#if strategy === 'input'}
						<input
							type="search"
							name="search"
							placeholder="filter"
							class={gridSearchInputClasses}
							on:input={handleSearchInput}
						/>
					{:else}
						<input
							type="search"
							name="search"
							placeholder="filter"
							class={gridSearchInputClasses}
						/>
					{/if}
				</div>
			</div>
		</form>
	</slot>
</DataGridCell>
