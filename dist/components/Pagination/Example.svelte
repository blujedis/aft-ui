<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import { Pagination } from ".";
import { PaginationPage } from "../PaginationPage";
import { jsondata } from "../_Example/jsondata";
import { colors } from "../../constants";
import { page as p } from "$app/stores";
const title = "Pagination";
const description = "Pager for data tables and record sets.";
const props = {
  focused: true,
  hovered: true,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "frame",
  transitioned: false,
  variant: "grouped"
};
let items = jsondata;
let page = parseInt($p.url.searchParams.get("page") || "1");
let pageSize = 3;
let pages = 5;
</script>

<ExamplePage {title} {description}>
	{#each colors as color}
		<div class="grid grid-cols-3 gap-2 mb-8">
			<div>
				<Pagination
					{...props}
					variant="flushed"
					bind:items
					bind:page
					bind:pageSize
					bind:pages
					theme={color}
					let:activePages
					let:endPage
				>
					<PaginationPage previous />
					<!-- <PaginationPage as="a" previous /> -->
					{#each activePages as pg}
						<PaginationPage value={pg}>{pg}</PaginationPage>
						<!-- <PaginationPage as="a" value={pg}>{pg}</PaginationPage> -->
					{/each}
					<PaginationPage next />
					<!-- <PaginationPage as="a" next /> -->
				</Pagination>
			</div>

			<div>
				<Pagination
					{...props}
					variant="filled"
					theme={color}
					ellipsis
					bind:items
					bind:page
					bind:pageSize
					bind:pages
					let:activePages
					let:endPage
				>
					<!-- <PaginationPage previous  /> -->
					<PaginationPage as="a" previous />
					{#each activePages as pg}
						<!-- <PaginationPage value={pg}>{pg}</PaginationPage> -->
						<PaginationPage as="a" value={pg}>{pg}</PaginationPage>
					{/each}
					<!-- <PaginationPage
						next
					/> -->
					<PaginationPage as="a" next />
				</Pagination>
			</div>

			<div>
				<Pagination
					{...props}
					variant="soft"
					bind:items
					bind:page
					bind:pageSize
					bind:pages
					theme={color}
					let:activePages
					let:endPage
				>
					<!-- <PaginationPage previous /> -->
					<PaginationPage as="a" previous />
					{#each activePages as pg}
						<!-- <PaginationPage value={pg}>{pg}</PaginationPage> -->
						<PaginationPage as="a" value={pg}>{pg}</PaginationPage>
					{/each}
					<!-- <PaginationPage
						next
					/> -->
					<PaginationPage as="a" next />
				</Pagination>
			</div>

			<!-- <div>
				<Pagination
					{...props}
					bind:this={pagination}
					variant="filled"
					items={jsondata.length}
					page={1}
					pageSize={5}
					pages={3}
					ellipsis
					theme={color}
					let:activePages
					let:page
					let:totalPages
					let:startPage
					let:endPage
				>
					<PaginationPage as="a" previous />
					{#each activePages as page}
						<PaginationPage as="a" value={page} />
					{/each}
					<PaginationPage as="a" next />
				</Pagination>
			</div> -->

			<!-- <div>
				<Pagination
					{...props}
					bind:this={pagination}
					variant="soft"
					items={jsondata.length}
					page={1}
					pageSize={5}
					pages={3}
					ellipsis
					theme={color}
					let:activePages
					let:page
					let:totalPages
					let:startPage
					let:endPage
				>
					<PaginationPage as="a" previous />
					{#each activePages as page}
						<PaginationPage as="a" value={page} />
					{/each}
					<PaginationPage as="a" next />
				</Pagination>
			</div> -->
		</div>
	{/each}
</ExamplePage>
