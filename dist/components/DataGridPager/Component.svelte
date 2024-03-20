<script>import { getContext } from "svelte";
import { gridPagerDefaults as defaults } from "./module";
import {
  themeStore,
  pickCleanProps,
  themer,
  Pagination,
  PaginationPage
} from "../..";
const context = getContext("DataGrid");
export let { ellipsis, page, pageSize, pages, size, theme, variant } = {
  ...defaults,
  size: context.globals?.size,
  theme: context.globals?.theme
};
$:
  gridPagerClasses = themer($themeStore).create("DataGridPager").prepend("datagrid-pager", true).append($$restProps.class, true).compile();
</script>

<Pagination
	{variant}
	items={$context.filtered.length}
	page={1}
	{pageSize}
	{pages}
	{ellipsis}
	{theme}
	class={gridPagerClasses}
	let:activePages
	let:page
	let:totalPages
	let:startPage
	let:endPage
>
	<PaginationPage previous />
	{#each activePages as page}
		<PaginationPage value={page} />
	{/each}
	<PaginationPage next />
</Pagination>
